<template>
  <v-app id="sign">
    <section>
      <transition name="fade">
        <v-container>
          <v-row justify="center" align="center">
            <span class="d-flex" @click="$Common.goRoute('/')" style="cursor:pointer;">
              <v-img src="/leaflog_symbol.png" height=32 width=32 contain></v-img>
              <v-img src="/leaflog.png" height=32 width=132 contain></v-img>
            </span>
          </v-row>
          <v-row justify="center" align="center" class="my-8 text-center">
            <v-card flat>
              <v-card-title class="d-flex justify-center align-center" style="font-size:1.5em;">
                계정 생성
              </v-card-title>
              <v-card-text class="d-flex justify-center align-center">
                leeflog 서비스 이용을 위해 나머지 정보를 입력해주세요.
              </v-card-text>
            </v-card>
          </v-row>
          <v-row justify="center" align="center" class="my-4">
            <v-chip color="primary">{{email}}</v-chip>
          </v-row>
          <v-row justify="center" align="center">
            <v-form
              ref="form"
              style="min-width:360px;"
            >
              <v-text-field
                v-model="nickname"
                :rules="nicknameRules"
                label="사용할 닉네임"
                required
                solo
                loading
                flat
                hide-details
                :disabled="isSignLoading"
                style="border-bottom:1px solid #f0f0f0;"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    :value="progressNickname"
                    absolute
                    height="1"
                  ></v-progress-linear>
                </template>
                <template v-slot:append>
                  <v-spacer/>
                  <transition name="slide-y-reverse-transition" appear>
                    <span v-if="nicknameRules[0]" class="text-caption">
                      <v-icon small color="primary">mdi-check-circle-outline</v-icon>
                      {{nicknameRules[1]}}
                    </span>
                  </transition>
                </template>
              </v-text-field>
              <transition name="slide-y-reverse-transition" appear>
                <span v-if="validate && !nicknameRules[0]" class="text-caption validate-alert-message">
                  <v-icon small color="primary">mdi-alert-circle-outline</v-icon>
                  {{nicknameRules[1]}}
                </span>
              </transition>


              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="비밀번호(특수문자 포함 10자리 이상)"
                required
                solo
                loading
                type="password"
                flat
                hide-details
                :disabled="isSignLoading"
                style="border-bottom:1px solid #f0f0f0;"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    :value="progressPwd"
                    absolute
                    height="1"
                  ></v-progress-linear>
                </template>
                <template v-slot:append>
                  <v-spacer/>
                  <transition name="slide-y-reverse-transition" appear>
                    <span v-if="passwordRules[0]" class="text-caption">
                      <v-icon small color="primary">mdi-check-circle-outline</v-icon>
                      {{passwordRules[1]}}
                    </span>
                  </transition>
                </template>
              </v-text-field>
              <transition name="slide-y-reverse-transition" appear>
                <span v-if="validate && !passwordRules[0]" class="text-caption validate-alert-message">
                  <v-icon small color="primary">mdi-alert-circle-outline</v-icon>
                  {{passwordRules[1]}}
                </span>
              </transition>
              
          
              <v-text-field
                v-model="passwordCheck"
                :rules="passwordCheckRules"
                label="비밀번호 확인"
                required
                hide-details
                :disabled="isSignLoading"
                type="password"
                loading
                solo
                flat
                style="border-bottom:1px solid #f0f0f0;"
              >
                <template v-slot:progress>
                  <v-progress-linear
                    :value="progressPwdCheck"
                    absolute
                    height="1"
                  ></v-progress-linear>
                </template>
                <template v-slot:append>
                  <v-spacer/>
                  <transition name="slide-y-reverse-transition" appear>
                    <span v-if="passwordCheckRules[0]" class="text-caption">
                      <v-icon small color="primary">mdi-check-circle-outline</v-icon>
                      일치
                    </span>
                  </transition>
                </template>
              </v-text-field>
              <transition name="slide-y-reverse-transition" appear>
                <span v-if="validate && !passwordCheckRules[0]" class="text-caption validate-alert-message">
                  <v-icon small color="primary">mdi-alert-circle-outline</v-icon>
                  {{passwordCheckRules[1]}}
                </span>
              </transition>
              
              
              <v-row align="center" justify="center" class="mt-8">
                <v-btn
                  :disabled="isSignLoading || (validate && !validateSign())"
                  color="primary"
                  text
                  outlined
                  rounded
                  :loading="isSignLoading"
                  @click="signUp"
                >
                  생성하기
                  <template v-slot:loader>
                    <v-progress-circular
                      :size="16"
                      :width="1"
                      color="primary"
                      indeterminate
                      class="mx-2"
                    ></v-progress-circular>
                    생성중..
                  </template>
                </v-btn>
              </v-row>
            </v-form>
          </v-row>
        </v-container>
      </transition>
    </section>
    <v-snackbar
        v-model="$store.state.alert"
        rounded="pill"
        outlined
        absolute
        infinite
        :timeout="2000"
        class="alert-snackbar"
        style="position:fixed; z-index:9999;"
        
        transition="slide-y-reverse-transition"
      >
        <v-icon left color="primary">mdi-alert-circle-outline</v-icon>
        <span>
          {{$store.state.alertMessage}}
        </span>
        <template v-slot:action="{ attrs }">
          <v-icon
            @click="$store.state.alert = false"
            v-bind="attrs"
            color="primary"
            dense
            class="mx-2"
          >
            mdi-close
          </v-icon>
        </template>
      </v-snackbar>
      
  </v-app>
</template>

<script>
import bcrypt from 'bcryptjs'
export default {
  name: 'App',

  components: {
  },

  created(){
    document.title = 'leeflog'
  },

  computed:{
    progressNickname(){
      return Math.min(100, this.$Common.getStringLength(this.nickname) * 25)
    },
    progressPwd(){
      return Math.min(100, this.$Common.getStringLength(this.password) * 10)
    },
    progressPwdCheck(){
      return Math.min(100, this.$Common.getStringLength(this.passwordCheck) * 10)
    },
    nicknameRules() {
      if(!this.nickname) {
        return [false,'사용할 닉네임을 입력해주세요.']
      } else {
        if(this.nickname && (this.$Common.getStringLength(this.nickname) < 4 || this.$Common.getStringLength(this.nickname) > 15)){
          return [false,'닉네임은 2자리 이상 8자리 이하로 해주세요']
        }
        if(this.nickname.indexOf(' ') !== -1){
          return [false, '닉네임에 공백이 포함되어 있습니다.']
        }
      }
      return [true,'적합']
    },
    passwordRules() {
      if(!this.password) {
        return [false,'비밀번호를 입력해주세요.']
      } else {
        if(this.password && this.$Common.getStringLength(this.password) <= 9){
          return [false,'비밀번호는 10자리 이상으로 해주세요']
        }
        if(this.password.indexOf(' ') !== -1){
          return [false, '비밀번호에 공백이 포함되어 있습니다.']
        }
        let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
        if(checkKor.test(this.password)){
          return [false, '비밀번호에 한글이 포함되어 있습니다.']
        }
        let checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
        if(!checkSpc.test(this.password)){
          return [false, '비밀번호에 특수문자가 하나이상 포함되어야 합니다.']
        }
      }
      return [true,'적합']
    },
    passwordCheckRules() {
      if(!this.passwordCheck) {
        return [false,'비밀번호를 다시 입력해주세요.']
      } else {
        if(this.passwordCheck !== this.password){
          return [false,'비밀번호가 일치하지 않습니다.']
        }
      }
      return [true,'일치']
    },
  },

  data: () => ({
    validate: false,
    nickname: '',
    isSignLoading: false,
    password: '',
    passwordCheck: '',
    email:''
  }),

  mounted(){
    this.init()
  },

  methods:{
    init() {
      const token = this.$Common.verifyToken(this.$route.query.token)
      if(typeof token === 'undefined' || token === ''){
        alert(this.$Lang.getString('alert_error_expired_page'))
        this.$Common.goRoute('/')
        location.reload()
        return
      }
      this.email = token.id
    },
    async signUp(){
      this.isSignLoading = true
      let passwordHash = bcrypt.hashSync(this.password, this.password.length)
      let user={
        id: this.nickname,
        email: this.email,
        authType: 'email',
        name: this.nickname,
        password: passwordHash
      }
      if(this.validateSign()) {
        this.$axios.post('/auth/new', user)
        .then(()=>{
          this.validate = false
          this.isSignLoading = false
          this.$Common.goRoute('/')
          location.reload()
        })
        .catch(err=>{
          try{
            this.$store.commit('setAlert', err.response.data.message)
          }catch{
            this.$store.commit('setAlert', this.Lang.getString('alert_error_500'))
          }
          this.validate = true
          this.isSignLoading = false
        })
      } else{
        this.validate = true
        this.isSignLoading = false
      }
    },
    validateSign(){
      return this.nicknameRules[0] && this.passwordRules[0] && this.passwordCheckRules[0]
    }
  }
};
</script>

<style lang="scss">
  @import '../../../scss/main.scss';
  @import '../../../scss/common.scss';
  .validate-alert-message{
    opacity: .7;
  }
</style>


