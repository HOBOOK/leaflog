<template>
<v-container class="pa-lg-16 pa-md-16 pa-xs-4 pa-sm-8" style="max-width: 1080px; min-height: calc(100vh + 200px)">
  <v-col class="text-left" cols="12">
    <transition name="slide-y-reverse-transition" appear>
      <h1 class="text-h3 mt-8 mb-8" style="font-weight:700; overflow:hidden; text-overflow: ellipsis;">{{this.article.title}}</h1>
    </transition>
    <v-col>
      <v-row class="align-center">
        <h4 class="subheading mr-4">@{{this.article.author}}</h4>
        <span v-cloak>{{typeof article.date !== 'undefined' ? this.$Time.dateToFormatKorean(this.article.date) : ''}}</span>
        <v-spacer/>
        <span class="d-flex flex-row-reverse">
            <span
              class="ma-1" 
              style="cursor:pointer"
              @click.stop="dialog = true"
            >
              <v-icon>mdi-delete-variant
              </v-icon> 삭제
            </span>
            <v-dialog
              v-if="author === userId" justify="center"
                v-model="dialog"
                max-width="500"
            >
            <v-card>
                <v-card-title class="headline">
                정말로 이 글을 삭제하시겠습니까?
                </v-card-title>
                <v-card-text>로그 삭제시 복구할 수 없습니다</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="dialog = false"
                >
                    취소
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="deleteArticle()"
                >
                    <v-icon>
                      mdi-delete-variant
                    </v-icon> 
                    삭제
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
          <span v-if="author === userId" class="ma-1" style="cursor:pointer"><v-icon>mdi-pencil-outline</v-icon> 편집</span>
          <span class="ma-1" style="cursor:pointer"><v-icon>mdi-share-variant-outline</v-icon> 공유</span>
        </span>
      </v-row>
    </v-col>
  </v-col>
  <v-col style="min-height:300px">
    <span v-html="article.content">
    </span>
  </v-col>
  <v-divider/>
  <div style="height:150px"></div>
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
        article: {},
        userId: '',
        dialog: false
      }
    },
    created() {
      this.currentPath = this.$Common.getCurrentRoutePath()
      this.title = JSON.parse(this.$Common.getCurrentRouteArticleInfo()).title
      this.author = JSON.parse(this.$Common.getCurrentRouteArticleInfo()).author
      this.userId = 'pkh879'
      this.getArticle()
    },
    computed: {
      articleUrl() { 
        return "http://localhost:3000/api/articles/" + this.author + "/" + this.title
      },
    },
    methods: {
      getArticle() {
        axios.get(this.articleUrl)
          .then(response => {
            this.article = response.data.data
          })
          .catch(err =>{
            console.log('error get article -> ' + err)
          })
      },
      deleteArticle() {
        this.dialog = false
        axios.delete(this.articleUrl)
          .then(() => {
            this.$Common.goRoute('/tree/@' + this.article.author)

          })
          .catch(err =>{
            console.log('error delete article -> ' + err)
          })
      }
    }
}
</script>