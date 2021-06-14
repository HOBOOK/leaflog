<template>
  <v-container>
    <v-row class="feed-container" no-gutters>
      <feed-card
        v-for="(article, i) in articles"
        :key="article.title"
        :index=i
        :value="article"
      />
    </v-row>
    <v-row v-if="isFetching" justify="center" align="center">
      <v-progress-circular class="justify-center align-center text-center" indeterminate color="primary"/>
    </v-row>
    <v-row v-if="isEnd" class="py-16 my-16" justify="center" align="end">
      더이상 가져올 내용이 없습니다.
    </v-row>
  </v-container>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'Feed',

    components: {
      FeedCard: () => import('@/components/FeedCard'),
    },

    data: () => ({
      page: 1,
      bottom: false,
      isFetching: false,
      isEnd: false,
      articles: []
    }),

    computed: {
      pages () {
        return Math.ceil(this.articles.length / 11)
      },
      articleUrl() { 
        return "/articles?page=" + this.page
      },
    },

    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
    },

    mounted() {
      this.fetchData()
    },

    watch: {
      bottom(bottom) {
        if (bottom && !this.isEnd) {
          this.fetchData()
        }
      }
    },

    methods: {
      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      },
      async fetchData() {
        if(this.isFetching)
          return
        this.isFetching = true
        this.isEnd = false
        await axios.get(this.articleUrl)
          .then(response => {
            if(typeof response.data.data !== 'undefined')
              this.fetchData2(response.data.data)
            else{
              if(typeof response.data.message !== 'undefined' && response.data.message === 'last'){
                this.isEnd = true
              }
              this.isFetching = false
            }
          })
          .catch(err => {
            this.isFetching = false
            console.log('fetch error -> ' + err)
          })
      },
      async fetchData2(datas) {
        for(let i = 0; i < datas.length; i++) {
          await this.$axios.get('/auth/' + datas[i].author)
          .then(res => {
            datas[i].authorAvatar = res.data.data.avatar
          })
          this.articles.push(datas[i])
        }
        this.isFetching = false
        this.page++
      }
    }
  }
</script>

