<template>
  <v-container fluid>
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
      <v-progress-circular class="justify-center" indeterminate color="#AFB42B" v-if="!isFetching"></v-progress-circular>
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
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
      page: 1,
      bottom: false,
      isFetching: false,
      articles: []
    }),

    computed: {
      pages () {
        return Math.ceil(this.articles.length / 11)
      },
      url() { 
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
        this.isFetching = true
        await axios.get(this.url)
          .then(response => {
            let datas = response.data.data.articles
            for(let i = 0; i < datas.length; i++) {
              let article = {
                title : datas[i].title,
                author : datas[i].author,
                caetogry : datas[i].category,
                thumbnail: datas[i].thumbnail,
                prominent: datas[i].prominent
              }
              this.articles.push(article)
            }
            this.isFetching = false
            
            this.page++
            console.log('fetch sucess page -> ' + (this.page-1))
          })
          .catch(err => {
            this.isFetching = false
            console.log('fetch error -> ' + err)
          })
      }
    }
  }
</script>
