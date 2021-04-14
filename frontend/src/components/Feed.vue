<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <feed-card
        v-for="(article, i) in articles"
        :key="article.title"
        :size=layout[i%layout.length]
        :index=i
        :value="article"
      />
      <v-col class="text-center" col=12>
      <v-progress-circular class="justify-center text-center" indeterminate color="#AFB42B" v-if="isFetching"></v-progress-circular>
      </v-col>
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
      layout: [2, 2, 3, 3, 3, 2, 2, 3, 3, 3],
      page: 1,
      bottom: false,
      isFetching: false,
      articles: []
    }),

    computed: {
      pages () {
        return Math.ceil(this.articles.length / 11)
      },
      articleUrl() { 
        return "http://localhost:3000/api/articles?page=" + this.page
      },
    },

    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
      this.fetchData()
    },

    watch: {
      bottom(bottom) {
        if (bottom) {
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
        await axios.get(this.articleUrl)
          .then(response => {
            if(typeof response.data.data !== 'undefined')
              this.fetchData2(response.data.data)
            else
              this.isFetching = false
          })
          .catch(err => {
            this.isFetching = false
            console.log('fetch error -> ' + err)
          })
      },
      async fetchData2(datas) {
        for(let i = 0; i < datas.length; i++) {
          datas[i].thumbnail = datas[i].thumbnail.length === 0 ? 'ancient.jpg' : datas[i].thumbnail
          await this.$axios.get('/api/auth/' + datas[i].author)
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
