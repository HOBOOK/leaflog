<template>
  <v-container fluid style="max-height:100%; height:100%;"
  
  >
    <v-layout column>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="ma-2"
    >
      <v-row class="align-center">
      <v-select
        v-model="select"
        solo
        single-line
        clearable
        flat
        small-chips
        :items="items"
        background-color="#FAFAFA"
        label="가지"
        dense
        color="#BDBDBD"
        class="ml-2 mr-2"
        style="max-width:250px;"
      ></v-select>

      <v-checkbox
        v-model="article.private"
        solo
        single-line
        clearable
        color="#BDBDBD"
        label="숨김글"
        required
        class="ma-2"
      ></v-checkbox>
      </v-row>
      <v-text-field
        v-model="article.title"
        solo
        single-line
        clearable
        flat
        label="제목을 입력하세요"
        required
        class="v-text-field-title"
      ></v-text-field>

      <v-divider class="ml-2 mr-2"></v-divider>
      
      <v-card
        flat
      >
        <vue-editor v-model="article.content"></vue-editor>
      </v-card>

      <div class="align-end d-flex flex-row-reverse">
        <v-btn
        rounded
        text
        outlined
        color="#827717"
        @click="showCreatePanel"
      >
        <v-img src="../assets/logo/leaflog_symbol.png" height=26 width=26 class="ma-2"></v-img>
        생성
      </v-btn>
      <v-btn
        rounded
        text
        outlined
        color="#757575"
        class="mr-4"
        @click="reset"
      >
        미리보기
      </v-btn>
      <v-btn
        rounded
        text
        outlined
        color="#757575"
        class="mr-4"
        @click="reset"
      >
        임시저장
      </v-btn>
      <v-btn
        rounded
        text
        color="#EF5350"
        class="mr-4"
        @click="$router.go(-1)"
      >
        <v-icon class="ma-2">mdi-close-circle-outline</v-icon> 취소
      </v-btn>
      </div>
    </v-form>
    </v-layout>

    <v-bottom-sheet v-model="createPanel" hide-overlay fullscreen>
        <v-sheet class="text-center ma-0 pa-0" style="height:100%;">
          <v-container class="d-flex justify-center align-center" style="height:100%;">
            <v-card flat style="width:80%;">
              <v-card-title class="text-center d-flex justify-center align-center">
                추가 정보 입력
              </v-card-title>
              <v-card-text class="py-3" justify="center" align="center">
                <v-sheet
                  flat
                  :max-height="370"
                  :height="370"
                  style="width:320px;"
                  class="ma-0 pa-0"
                >
                  <div>
                    <v-img
                      :height="192"
                      :width="320"
                      style="background-color:rgba(0, 0, 0, .12)"
                      :src="thumbnail"
                    />
                  </div>
                  <div class="image-upload-container">
                    <div>
                        <label class="image-upload pa-2">
                        <v-icon small left>mdi-image-edit-outline</v-icon>
                        썸네일 변경
                        <v-file-input 
                            v-model="imageFile"
                            accept="image/png, image/jpeg, image/bmp"
                            dense
                            @change="inputImageChange"
                            hide-input
                        />
                        </label> 
                    </div>
                  </div>
                  
                  <v-row class="mt-8 mx-0">
                    <v-textarea
                      outlined
                      flat
                      no-resize
                      label="이 글은 어떤 글인가요? (최대 100자)"
                      :hide-details="true"
                      :solo="true"
                      background-color="#fafafa"
                    >
                    </v-textarea>
                  </v-row>
                </v-sheet>
              </v-card-text>
              <v-card-actions class="d-flex justify-center align-end">
                <v-btn
                  @click="createLeaf"
                  rounded
                  text
                  outlined
                  class="mx-2"
                >
                  <v-img src="../assets/logo/leaflog_symbol.png" height=26 width=26 class="ma-2"></v-img>
                  생성
                </v-btn>
                <v-btn
                  color="error"
                  rounded
                  text
                  outlined
                  class="mx-2"
                  @click="createPanel = !createPanel"
                >취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
  </v-container>
</template>
<script>
import axios from "axios"
import { VueEditor } from "vue2-editor"
export default {
    components: {
      VueEditor
    },
    data: () => ({
      currentPath: '',
      article: {
        title: '',
        content: '',
        author: '',
        thumbnail: '',
        category: '',
        private: false,
        prominent: false,
        water: 0,
        view: 0
      },
      imageFile:[],
      thumbnail: '/default-image',
      valid: true,
      select: null,  
      items: [],
      createPanel: false,
      targetRoot: null
    }),
    created() {
      this.currentPath = this.$Common.getCurrentRoutePath()
      
      let query = this.$route.query[""]
      if(typeof query === 'undefined' || !query) {
        console.log('Error get query')
      }
      query = JSON.parse(query)
      this.article.author = query.author
      let root = query.title
      this.select = root.length === 0 ? '뿌리' : root
      this.items.push('뿌리')
      this.items.push(this.select)
    },
    computed: {
    },
    mounted() {

    },
    methods: {
      showCreatePanel () {
        this.createPanel = !this.createPanel
      },
      validate () {
        if (this.article.author.length === 0) {
          return false
        } else if (this.article.title.length === 0) {
          console .log('validate error -> title is invalid')
          return false
        }
        return true
      },
      reset () {
      this.$refs.form.reset()
      },
      resetValidation () {
      this.$refs.form.resetValidation()
      },
      findLeafInRoot (root, select) {
        if (select === '뿌리') {
          let leaf = {
            name: this.article.title,
            children: []
          }
          root.push(leaf)
          this.targetRoot = root
          return
        }
        for (let i = 0; i < root.length; i++) {
          this.findLeafInRootRecursive(root[i], select)
        }
      },
      findLeafInRootRecursive (parent, select) {
        if (parent.name === select) {
          let leaf = {
            name: this.article.title,
            children: []
          }
          parent.children.push(leaf)
          this.targetRoot = parent
        } else {
          for (let i = 0; i < parent.children.length; i++) {
            this.findLeafInRootRecursive(parent.children[i], select)
          }
        }
      },

      // 새로운 루트 생성
      async createLeaf () {
        let pageTree = null
        // 트리 구조 가져오기
        await axios.get('/leafs/' + this.article.author)
        .then(response => {
          pageTree = response.data.data
          let leafKeyIndexes = response.data.data.keyIndexes
          if (leafKeyIndexes.indexOf(this.article.title) !== -1) {
            console.log('leaf title is duplicated -> ' + this.article.title)
            return
          }
        })

        if(typeof pageTree === 'undefined' || pageTree === null){
          this.alert()
          return
        }

        let root = pageTree.root

        // 트리 에서 루트찾기
        this.targetRoot = null
        this.findLeafInRoot(root, this.select)
        if(this.targetRoot !== null) {
          // 키인덱스에 생성될 문서 제목 추가
          pageTree.keyIndexes.push(this.article.title)
          // 루트 업데이트
        } else {
          this.alert()
          return
        }

        axios.put('/leafs/', pageTree)
        .then(() => {
          this.createArticle()
        })
      },

      // 새로운 문서 생성
      createArticle() {
        axios.post('/articles', this.article)
          .then(() => {
            this.reloadNavigationRoot()
            this.$Common.goRoute('tree/@' + this.article.author + '/' + this.article.title)
          })
          .catch(err => {
            console.log('error create article -> ' + err)
          })
      },

      // 네비게이션 트리 리로드
      reloadNavigationRoot() {
        let app = this.$root._self.$children[0]
        app.findLeafsById(this.article.author)
      },

      inputImageChange(event){
          this.article.thumbnail = event.name
          this.thumbnail = window.URL.createObjectURL(event)
      },
    }
}
</script>
<style>
  .v-text-field-title input{
    font-weight:600;
    font-size:1.5rem;
  }
  .v-text-field--outlined fieldset {
    border: none !important;
  }
  .v-text-field-title .v-label{
    opacity: 0.5;
    padding: 0.2rem;
    height:1.5rem;
    font-weight:600;
    font-size:1.5rem;
  }
  .v-textarea-content .v-label{
    opacity: 0.5;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details  {
    display: none;
  }
  .v-messages{
    display: none;
  }
  
  /*
    vue2-editor(quill)
  */
  .quillWrapper{
    border:none !important;
  }
  .ql-toolbar{
    border:none !important;
  }
  .ql-container{
    border:none !important;
    height: calc(100vh - 300px) !important;
  }
  .ql-editor{
    border:none !important;
  }

</style>