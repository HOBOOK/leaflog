<template>
  <v-dialog
    v-model="loginDialogShow"
    transition="scroll-y-reverse-transition"
    width="900"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" 
        outlined 
        rounded 
        color="primary"
        v-bind="attrs"
        v-on="on"
        v-if="!$store.state.isLogin"
      >
        로그인
      </v-btn>
      
      <span v-else>
        <div class="admin-header mx-2" style="min-width:160px;">
          <div 
            class="admin-button" 
            :class="{on:isMenuActive}"
            @click="isMenuActive = !isMenuActive"
          >
            <v-avatar
              size="32"
              class="mx-2"
            >
              <v-img
                :src="$File.getAvatar($Storage.getUser().avatar)">
              </v-img>

            </v-avatar>
            <span class="ml-1 font-weight-bold">{{$Storage.getUser().name}}</span>
            <v-icon class="row-down" color="primary" small>mdi-chevron-down </v-icon>
          </div>
          <div class="admin-content">
            <v-container class="py-0">
              <v-row class="my-0">
                <v-btn :ripple="false" text block @click="setting" class="d-flex justify-start pa-2">설정</v-btn>
              </v-row>
              <v-row class="my-0">
                <v-btn :ripple="false" text block @click="logout" class="d-flex justify-start pa-2">로그아웃</v-btn>
              </v-row>
            </v-container>
          </div>
        </div>
      </span>
    </template>

    <v-card>
      <v-container class="pa-0 ma-0" style="background-color:#f0f0f0; position:relative;">
      <v-row class="pa-0 ma-0" style="color:#555;">
        <v-col 
          class="col-7 ma-0 pa-0 d-flex justify-center align-center"
          style="background-color:#E8F5E9; border-top-right-radius:0%; border-top-left-radius:0%;" 
        >
          <v-container>
            <v-row class="d-flex justify-center align-center">
              <v-avatar size="64">
                <v-img src="/favicon.png"></v-img>
              </v-avatar>
            </v-row>
            
            <v-row>
              <v-img class="my-4" src="/leaflog.png" height=26 contain></v-img>
            </v-row>
          </v-container>
        </v-col>
        <v-col
          class="col-5"
          style="background-color:#fff; border-top-left-radius:0%; border-bottom-right-radius:15%; "
        >
          <v-row class="ma-0 pa-0">
            <v-spacer />
            <v-btn
              text
              small
              fab
              @click="closeLoginDialog()"
              class="ma-2 pa-0"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-card-title
            class="font-weight-bold"
            transition="slide-x-transition"
            :key="signUpMode"
          >
            <span>{{signUpMode ? '회원가입' : '로그인'}}</span>
          </v-card-title>
          
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="이메일"
                required
                solo
                loading
                flat
                hide-details
                :disabled="signUpMode && (isSignLoading || signUpSuccess)"
                style="border-bottom:1px solid #f0f0f0;"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    :value="progressEmail"
                    absolute
                    height="1"
                    :indeterminate="signUpMode && isSignLoading"
                  ></v-progress-linear>
                </template>
                <template v-slot:append>
                  <v-spacer/>
                  <transition name="slide-y-reverse-transition" appear>
                  <span v-if="signUpMode && signUpSuccess" class="text-caption">
                    <v-icon small color="primary">mdi-check-circle-outline</v-icon>
                    전송 완료
                  </span>
                  </transition>
                </template>
              </v-text-field>
          
              <v-text-field
                v-if="!signUpMode"
                v-model="password"
                :rules="passwordRules"
                label="비밀번호"
                required
                hide-details
                type="password"
                loading
                solo
                flat
                style="border-bottom:1px solid #f0f0f0;"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    :value="progressPwd"
                    absolute
                    height="1"
                  ></v-progress-linear>
                </template>
              </v-text-field>

              
              <v-row align="center" class="mx-0 px-0 mt-4">
                <v-btn
                  v-if="! signUpMode"
                  :disabled="!valid || isSignLoading"
                  color="primary"
                  text
                  outlined
                  rounded
                  :loading="isSignLoading"
                  @click="sign"
                >
                  들어가기
                  <template v-slot:loader>
                    <v-progress-circular
                      :size="16"
                      :width="1"
                      color="primary"
                      indeterminate
                      class="mx-2"
                    ></v-progress-circular>
                  </template>
                </v-btn>
                <v-btn
                  v-else
                  :disabled="!valid || signUpSuccess || isSignLoading"
                  color="primary"
                  text
                  outlined
                  rounded
                  @click="sign"
                >
                  회원가입
                </v-btn>
                <v-spacer/>
                <div style="cursor:pointer; font-weight:500;" v-if="signUpMode" @click="signUpMode = false">로그인 화면</div>
                <div style="cursor:pointer; font-weight:500;" v-else @click="signUpMode = true">회원가입</div>
              </v-row>
            </v-form>

            

            <v-row class="mt-4 mb-0 justify-center">
              <p class="text--disabled">또는</p>
            </v-row>
            <v-row 
              align="center"
              justify="center"
            >
              <v-btn
                fab
                text
                class="mx-2"
              >
                <v-img :width="48" :height="48" contain src="/google.svg">
                </v-img>
              </v-btn>
              <v-btn
                fab
                text
                class="mx-2"
              >
                <v-img :width="48" :height="48" contain src="/naver.svg">
                </v-img>
              </v-btn>
              <v-btn
                fab
                text
                class="mx-2"
              >
                <v-img :width="48" :height="48" contain src="/github.svg">
                </v-img>
              </v-btn>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    data () {
      return {
        currentPath: this.getCurrentPath(),
        password: '',
        passwordRules: [
          v => !!v || '비밀번호를 입력해주세요',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || '아메일을 입력해주세요',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        valid: false,
        signUpSuccess: false,
        signUpMode: false,
        isSignLoading: false,
        isMenuActive: false,
      }
    },
    computed: {
      loginDialogShow: {
        get () {
          return this.$store.state.loginDialogShow
        },
        set (val){
          this.$store.state.loginDialogShow = val;
        }
      },
      progressEmail(){
        return Math.min(100, this.email.length * 10)
      },
      progressPwd(){
        return Math.min(100, this.password.length * 10)
      }
    },
    watch: {
        loginDialogShow (val) {
            console.log('login dialog: ' + val)   
        }
    }, 
    methods: {
      getCurrentPath: function(){
        return this.$router.currentRoute.path;
      },
      closeLoginDialog() {
        this.loginDialogShow = false
      },
      sign(){
        if(this.signUpMode){
          this.signUp()
        }else{
          this.login()
        }
      },
      async login() {
        this.isSignLoading = true
        let data = {
          email: this.email,
          password: this.password
        }
        let id = ''
        let token = ''
        await this.$axios.post('/auth/login', data, null)
          .then(res => {
            id = this.$Common.verifyToken(res.data.token).id
            token = res.data.token
          })
          .catch(err => {
            console.log(err)
            this.$store.commit('setAlert', '로그인 실패')
          })
        if(id.length === 0){
          this.$store.commit('setAlert', '로그인 실패')
        }else {
          console.log(id)
          await this.$axios.get('/auth/' + id)
          .then(res => {
            this.$Storage.setUser(res.data.data, true)
            this.$store.dispatch('login', token)
            this.closeLoginDialog()
            location.reload()
          })
          .catch(err =>{
            console.log(err)
            this.$store.commit('setAlert', '로그인 실패')
          })
        }
        this.isSignLoading = false
      },
      setting() {
        this.isMenuActive = false
        this.$Common.goRoute('/settings')
      },
      logout() {
        this.isMenuActive = false
        this.$store.dispatch('logout')
        this.$Common.goRoute('/')
        location.reload()
      },
      async signUp(){
        this.isSignLoading = true
        const email = {
          to: this.email,
          type: 'signup'
        }
        await this.$axios.post('/auth/email/signup', email)
        .then(() =>{
          this.signUpSuccess = true
        })
        .catch(err=>{
          console.log(err.response)
          try {
            this.$store.commit('setAlert', err.response.data.message)
          }catch{
            this.$store.commit('setAlert', '회원가입 인증메일 전송에 실패하였습니다. 다시 시도해주세요.')
          }
          this.signUpSuccess = false
        })
        .finally(()=>{
          this.isSignLoading = false
        })
      }
    }
}
</script>
<style scoped>
  div >>> .v-card {
    overflow: hidden;
  }
</style>