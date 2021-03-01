<template>
<v-container class="pa-lg-16 pa-md-16 pa-xs-4 pa-sm-8" style="max-width: 1080px; min-height: calc(100vh + 200px)">
  <v-col class="text-left" cols="12">
    <transition name="slide-y-reverse-transition" appear>
      <h1 class="text-h3 mt-8 mb-8" style="font-weight:700; overflow:hidden; text-overflow: ellipsis;">{{this.article.title}}</h1>
    </transition>
    <v-col>
      <v-row class="align-center" style="position:sticky !important; top:10rem;">
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
  <v-col class="mt-8 mb-8">
    <v-row>
      <v-col cols="2">
        <v-avatar
          size="128px"
          v-if="author"
        >
          <img
            alt="Avatar"
            :src="`https://randomuser.me/api/portraits/men/` + author.avatar +`.jpg`"
          >
        </v-avatar>
      </v-col>
      <v-col cols="10" justify-center align-center>
        <v-row>
        {{author.id}}
        </v-row>
        <v-row>
          {{author.introduction}}
        </v-row>
      </v-col>
    </v-row>
  </v-col>
  <v-divider/>
  <v-col style="min-height:150px">
    <span 
      v-for="item in article.comments"
      :key="item"
    >
      <v-avatar
        size="32px"
        v-if="item.author"
      >
        <img
          alt="Avatar"
          :src="item.avatar"
        >
      </v-avatar>
      {{$Time.dateToFormatKorean(item.regDate)}} - {{item.author}} : {{item.comment}}
    </span>
  </v-col>
  <div style="height:150px"></div>
</v-container>
</template>

<script>
export default {
    data () {
      return {
        currentPath: '',
        authorId: '',
        title: '',
        article: {},
        author: {},
        userId: '',
        dialog: false
      }
    },
    created() {
      this.currentPath = this.$Common.getCurrentRoutePath()
      this.title = JSON.parse(this.$Common.getCurrentRouteArticleInfo()).title
      this.authorId = JSON.parse(this.$Common.getCurrentRouteArticleInfo()).author
      this.userId = 'pkh879'
      this.getArticle()
    },
    methods: {
      async getArticle() {
        await this.$axios.get("http://localhost:3000/api/articles/" + this.authorId + "/" + this.title)
          .then(response => {
            this.article = response.data.data
          })
          .catch(err =>{
            console.log('error get article -> ' + err)
          })

        await this.getAuthor()

        await this.getComment(this.article.comments)
      },
      async deleteArticle() {
        this.dialog = false
        let leafs = null
        await this.$axios.get("http://localhost:3000/api/leafs/" + this.userId)
          .then(res => {
            leafs = res.data.data
            this.$Common.deleteLeafInRoot(leafs.root, this.title)
          })
          .catch(err => {
            console.log('fetch error leafs -> ' + err)
          })

        await this.$axios.put("http://localhost:3000/api/leafs/", leafs)
        .catch(err =>{
          console.log(err)
        })
        
        await this.$axios.delete("http://localhost:3000/api/articles/" + this.authorId + "/" + this.title)
          .then(() => {
            this.$Common.goRoute('/tree/@' + this.article.author)
          })
          .catch(err =>{
            console.log('error delete article -> ' + err)
          })
      },
      getAuthor() {
        this.$axios.get("http://localhost:3000/api/auth/" + this.authorId)
        .then(res => {
          this.author = res.data.data
        })
      },
      async getComment(comments) {
        for(let i = 0; i < comments.length; i++) {
          await this.$axios.get('/api/auth/' + comments[i].author)
          .then(res => {
            comments[i].avatar = `https://randomuser.me/api/portraits/men/` + res.data.data.avatar +`.jpg`
          })
        }
      }
    }
}
</script>