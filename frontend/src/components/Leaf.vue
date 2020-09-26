<template>
<v-container fluid>
  <v-col class="text-center mt-16" cols="12">
    <transition name="slide-y-reverse-transition" appear>
      <h1 class="mt-8 mb-4 text-h3" style="font-weight:700">{{this.article.title}}</h1>
    </transition>
    <v-row>
      <h4 class="subheading mr-4">@{{this.article.author}}</h4>
      <span v-cloak>{{typeof article.date !== 'undefined' ? this.$Time.dateToFormatKorean(this.article.date) : ''}}</span>
    </v-row>
  </v-col>
  <v-col>
    <span v-html="article.content">
    </span>
  </v-col>
</v-container>
</template>

<script>
import axios from "axios"

export default {
    data () {
      return {
        currentPath: '',
        author: '',
        title: '',
        article: {}
      }
    },
    created() {
      this.currentPath = this.$Common.getCurrentRoutePath()
      this.title = JSON.parse(this.$Common.getCurrentRouteArticleInfo()).title
      this.author = JSON.parse(this.$Common.getCurrentRouteArticleInfo()).author
      this.getArticle()
    },
    computed: {
      articleUrl() { 
        const query = {
          author: this.author,
          title: this.title
        }
        return "http://localhost:3000/api/articles/" + JSON.stringify(query)
      },
    },
    methods: {
      getArticle() {
        axios.get(this.articleUrl)
          .then(response => {
            this.article = response.data.data.article
            console.log('success get article -> ' + response)
          })
          .catch(err =>{
            console.log('error get article -> ' + err)
          })
      }
    }
}
</script>