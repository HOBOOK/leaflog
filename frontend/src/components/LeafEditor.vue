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
        <v-card
          flat
          class="pt-2 pb-2 ml-2 mr-2"
        >
          <v-icon size=18 class="pa-2">mdi-format-header-1</v-icon>
          <v-icon size=18 class="pa-2">mdi-format-header-2</v-icon>
          <v-icon size=18 class="pa-2">mdi-format-header-3</v-icon>
          <v-icon size=18 class="pa-2">mdi-format-header-5</v-icon>
          <v-divider vertical class="pt-4 pl-2"></v-divider>
          <v-icon size=18 class="pa-2">mdi-format-bold</v-icon>
          <v-icon size=18 class="pa-2">mdi-format-italic</v-icon>
        </v-card>
        <v-textarea
          v-model="article.content"
          solo
          flat
          label="당신의 지식을 기록하세요"
          no-resize
          required
          class="d-flex v-textarea-content"
        ></v-textarea>
      </v-card>

      <div class="align-end d-flex flex-row-reverse">
        <v-btn
        rounded
        text
        outlined
        color="#827717"
        @click="createLeaf"
      >
        <v-img src="../assets/logo/leaflog_symbol.png" height=26 width=26 class="ma-2"></v-img>
        생성
      </v-btn>
      <v-btn
        rounded
        text
        outlined
        color="#BDBDBD"
        class="mr-4"
        @click="reset"
      >
        임시저장
      </v-btn>
      </div>
    </v-form>
    </v-layout>

    <v-bottom-sheet v-model="sheet" hide-overlay>
        <v-sheet class="text-center" height="100px">
          <v-btn
            class="mt-6"
            text
            color="error"
            @click="sheet = !sheet"
          >close</v-btn>
          <div class="py-3">This is a bottom sheet using the persistent prop</div>
        </v-sheet>
      </v-bottom-sheet>
  </v-container>
</template>
<script>
import axios from "axios"
export default {
    data: () => ({
      article: {
        title: '',
        content: '',
        author: '',
        private: false,
        prominent: false,
        water: 0
      },
      valid: true,
      select: null,  
      items: [],
      sheet: false,
    }),
    computed: {
      articleUrl() { 
        return "http://localhost:3000/api/articles"
      }
    },
    mounted() {
      this.initialize()
    },
    methods: {
      alert () {
        this.sheet = !this.sheet
      },
      initialize () {
        // get list of user's tree
        let query = this.$route.query[""]
        if(typeof query === 'undefined' || !query) {
          console.log('Error initialize')
        }
        let root = query.substring(query.lastIndexOf('/') + 1)
        this.select = root.length === 0 ? '뿌리' : root
        this.items.push('뿌리')
        this.items.push(this.select)
      },
      validate () {
      this.$refs.form.validate()
      },
      reset () {
      this.$refs.form.reset()
      },
      resetValidation () {
      this.$refs.form.resetValidation()
      },
      createLeaf () {
        console.log('chk > ' + JSON.stringify(this.article))
        axios.post(this.articleUrl, this.article)
          .then(response => {
            console.log('create success -> ' + response)
          })
          .catch(err => {
            console.log('create err -> ' + err)
          })
      }
    }
}
</script>
<style>
  .v-text-field-title input{
    font-weight:600;
    font-size:1.5rem;
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
  
  textarea{
    height:calc(100vh - 330px)
  }
</style>