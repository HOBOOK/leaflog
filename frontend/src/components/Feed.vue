<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <feed-card
        v-for="(article, i) in paginatedArticles"
        :key="article.title"
        :size="layout[i]"
        :value="article"
      />
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

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
    }),

    computed: {
      ...mapState(['articles']),
      pages () {
        return Math.ceil(this.articles.length / 11)
      },
      url() { 
        return "https://jsonplaceholder.typicode.com/posts?_page=" + this.page
      },
      paginatedArticles () {
        const start = (this.page - 1) * 11
        const stop = this.page * 15

        return this.articles.slice(start, stop)
      },
    },

    created() {
      this.fetchData()
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      },
    },

    methods: { 
      async fetchData() { 
        const response = await axios.get(this.url); 
        this.titles = response.data; 
      },
    }
  }
</script>
