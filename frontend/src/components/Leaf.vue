<template>
<v-container style="min-height: calc(100vh + 200px); width:100%;">
  <v-row class="pb-16">
    <v-col cols="10" class="ma-0 pa-0">
      <transition name="slide-y-reverse-transition" appear>
        <v-row>
        <h1 class="text-h3 mt-8 mb-8" style="font-weight:700; overflow:hidden; text-overflow: ellipsis;">{{this.article.title}}</h1>
        </v-row>
      </transition>
      <v-row class="align-center">
        <v-icon small left>mdi-feather</v-icon>
        <h4 class="subheading">{{this.article.author}}</h4>
        <span v-cloak class="text-caption ml-4">{{typeof article.date !== 'undefined' ? this.$Time.dateToFormatKorean(this.article.date) : ''}}</span>
        <v-spacer/>
      </v-row>
      <v-row  class="mt-16" style="min-height:300px;">
        <span v-html="article.content">
        </span>
      </v-row>
      <v-row class="mt-8 mb-8">
        <v-row>
          <v-col cols="2">
            <v-avatar
              size="128px"
              v-if="author"
            >
              <v-img
                alt="Avatar"
                :lazy-src="$File.getAvatar(author.avatar)"
                :src="$File.getAvatar(author.avatar)"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" justify-center align-center>
            <v-row class="font-weight-bold">
            {{author.id}}
            </v-row>
            <v-row>
              {{author.introduction}}
            </v-row>
          </v-col>
        </v-row>
      </v-row>
      <v-divider/>
      <v-row class="mt-8">
        <v-text-field
          flat
          label="댓글을 남겨주세요"
          :solo="true"
          :hide-details="true"
          v-model="commentText"
          style="border: 1px solid rgba(0, 0, 0, 0.12);"
        >
        </v-text-field>
        <v-btn class="ma-4 font-weight-bold" elevation=0 @click="sendComment" filled>댓글 작성</v-btn>
      </v-row>
      <v-row style="min-height:150px" class="mt-8 mx-0 px-0">
        <v-col
          cols="12" 
          v-for="item in article.comments"
          :key="item.id"
          class="mx-0 pa-0 mb-8"
        >
          <v-row align="center" class="mx-0 px-0">
            <v-avatar
              size="48"
              v-if="item.author"
            >
              <v-img
                alt="Avatar"
                :src="$File.getAvatar(item.avatar)"
              ></v-img>
            </v-avatar>
            <v-col class="ml-4">
              <v-row>
                <span class="font-weight-bold">{{item.author}}</span>
              </v-row>
              <v-row>
                <span class="text-caption">{{$Time.dateToFormatForToday(item.regDate)}}</span>
              </v-row>
            </v-col>
            <v-spacer/>
          </v-row>
          <v-row class="my-4 mx-0 px-0">
            {{item.comment}}
          </v-row>
          <v-divider/>
        </v-col>
      </v-row>
    </v-col>
    <v-col 
      cols="2"
    >
      <div 
        style="margin-top:300px !important;"
        v-sticky="{ zIndex: 10,  stickyTop: 128}"
        class="mx-8"
      >
      <v-row
        style="cursor:pointer"
        @click.stop="dialog = true"
        class="my-4"
        justify="center"
      >
        <v-icon>mdi-delete-empty-outline</v-icon> 
      </v-row>
      <v-dialog
        v-if="isAuthor" justify="center"
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
              color="green darken-1"
              text
              outlined
              @click="deleteArticle()"
          >
             삭제
          </v-btn>
          <v-btn
              text
              @click="dialog = false"
          >
            취소
          </v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
      <v-row v-if="isAuthor" justify="center" class="my-4" style="cursor:pointer"><v-icon @click="editLeaf">mdi-pencil-outline</v-icon> </v-row>
      <v-row v-if="isAuthor" justify="center" class="my-4" style="cursor:pointer"><v-icon>mdi-share-variant-outline</v-icon> </v-row>
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import VueSticky from 'vue-sticky'

export default {
    directives:{
      sticky: VueSticky
    },
    data () {
      return {
        authorId: '',
        title: '',
        article: {},
        author: {},
        dialog: false,
        comment: null,
        commentText:''
      }
    },
    computed: {
      isAuthor() {
        return this.$Storage.getUser() !==null && this.authorId === this.$Storage.getUser().id
      }
    },
    watch:{
      '$route'() {
        this.init()
      },
    },
    mounted() {
      this.init()
    },
    
    methods: {
      init() {
        let routerParams = this.$router.currentRoute.params
        this.title = routerParams.key
        this.authorId = routerParams.id.substring(1)
        this.$store.state.currentLeaf = {
          title: this.title,
          author: this.authorId,
          editMode: false
        }
        this.getArticle()
      },
      async getArticle() {
        await this.$axios.get("/articles/" + this.authorId + "/" + this.title)
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
        await this.$axios.get("/leafs/" + this.author.id)
          .then(res => {
            leafs = res.data.data
            this.$Common.deleteLeafInRoot(leafs.root, this.title)
          })
          .catch(err => {
            console.log('fetch error leafs -> ' + err)
          })
        if(leafs.keyIndexes.indexOf(this.title) !== -1) {
          leafs.keyIndexes.splice(leafs.keyIndexes.indexOf(this.title), 1)
        }
        await this.$axios.put("/leafs/", leafs)
        .catch(err =>{
          console.log(err)
        })
        
        await this.$axios.delete("/articles/" + this.authorId + "/" + this.title)
          .then(() => {
            this.$Common.goRoute('/tree/@' + this.article.author)
            this.reloadNavigationRoot()
          })
          .catch(err =>{
            console.log('error delete article -> ' + err)
          })
      },
      getAuthor() {
        this.$axios.get("/auth/" + this.authorId)
        .then(res => {
          this.author = res.data.data
        })
      },
      async getComment(comments) {
        for(let i = 0; i < comments.length; i++) {
          await this.$axios.get('/auth/' + comments[i].author)
          .then(res => {
            comments[i].avatar = res.data.data.avatar
          })
        }
      },
      sendComment() {
        if(this.commentText.length === 0){
          this.$store.commit('setAlert', this.$Lang.getString('alert_error_comment_empty'))
          return
        }
        this.comment = {
          regDate: new Date().toUTCString(),
          author: this.$Storage.getUser().id,
          avatar: this.$Storage.getUser().avatar,
          comment: this.commentText,
          childrens: []
        }
        this.article.comments.push(this.comment)
        this.axios.put('/articles', this.article)
        .then(() => {
          this.getComment(this.article.comments)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(()=> {
          this.commentText = ''
          this.comment = null
        })
      },

      // 네비게이션 트리 리로드
      reloadNavigationRoot() {
        let app = this.$root._self.$children[0]
        app.findLeafsById(this.article.author)
      },

      // 글 편집
      editLeaf(){
        this.$store.state.currentLeaf.editMode = true
        this.$store.state.currentLeaf.article = this.article
        this.$Common.goRoute('/edit')
      }
    }
}
</script>