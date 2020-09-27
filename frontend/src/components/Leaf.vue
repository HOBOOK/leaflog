<template>
<v-container class="pa-lg-16 pa-md-16 pa-xs-4 pa-sm-8" style="max-width:900px">
  <v-col class="text-left mt-16" cols="12">
    <transition name="slide-y-reverse-transition" appear>
      <h1 class="mt-8 mb-4 text-h3" style="font-weight:700">{{this.article.title}}</h1>
    </transition>
    <v-row>
      <v-row>
        <h4 class="subheading mr-4">@{{this.article.author}}</h4>
        <span v-cloak>{{typeof article.date !== 'undefined' ? this.$Time.dateToFormatKorean(this.article.date) : ''}}</span>
      </v-row>
      <v-spacer/>
      <v-row class="d-flex flex-row-reverse">
        <span class="ma-1"><v-icon>mdi-delete-variant</v-icon> 삭제</span>
        <span class="ma-1"><v-icon>mdi-pencil-outline</v-icon> 편집</span>
        <span class="ma-1"><v-icon>mdi-share-variant-outline</v-icon> 공유</span>
      </v-row>
    </v-row>
  </v-col>
  <v-col style="min-height:200px">
    <span v-html="article.content">
    </span>
  </v-col>
  <v-divider/>
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