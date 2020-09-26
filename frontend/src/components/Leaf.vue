<template>
<v-container fluid>
  <v-col class="text-center" cols="12">
    <transition name="slide-y-reverse-transition" appear>
      <h1 class="mb-4 text-h3">{{this.article.title}}</h1>
    </transition>
    <v-row>
      <h4 class="subheading">@{{this.article.author}}</h4>
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
        currentPath: this.getCurrentPath(),
        author: '',
        title: '',
        article: {}
      }
    },
    created() {
      this.title = this.currentPath.substring(this.currentPath.lastIndexOf('/')+1)
      this.author = this.currentPath.substring(this.currentPath.indexOf('@')+1, this.currentPath.lastIndexOf('/'))
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
      getCurrentPath() {
        return this.$router.currentRoute.path;
      },
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