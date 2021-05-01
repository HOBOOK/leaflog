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
            <v-chip color="primary">pkh879@naver.com</v-chip>
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
                  <v-icon small color="primary">mdi-alert</v-icon>
                  {{nicknameRules[1]}}
                </span>
              </transition>


              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="비밀번호(12자리 이상)"
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
                  <v-icon small color="primary">mdi-alert</v-icon>
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
                  <v-icon small color="primary">mdi-alert</v-icon>
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
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  created(){
    document.title = 'leeflog'
  },

  computed:{
    progressPwd(){
      return Math.min(100, this.password.length * 10)
    },
    progressPwdCheck(){
      return Math.min(100, this.passwordCheck.length * 10)
    },
    nicknameRules() {
      if(this.nickname.length === 0) {
        return [false,'사용할 닉네임을 입력해주세요.']
      } else {
        if(this.nickname && (this.nickname.length < 4 || this.nickname.length > 12)){
          return [false,'닉네임은 4자리 이상 12자리 이하로 해주세요']
        }
      }
      return [true,'적합']
    },
    passwordRules() {
      if(this.password.length === 0) {
        return [false,'비밀번호를 입력해주세요.']
      } else {
        if(this.password && this.password.length <= 11){
          return [false,'비밀번호는 12자리 이상으로 해주세요']
        }
      }
      return [true,'적합']
    },
    passwordCheckRules() {
      if(this.passwordCheck.length === 0) {
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
    passwordCheck: ''
  }),

  methods:{
    async signUp(){
      this.isSignLoading = true
      
      setTimeout(()=>{
        this.isSignLoading = false
        if(this.validateSign()) {
          this.validate = false
          alert('생성 성공')
        } else{
          this.validate = true
        }
      }, 2000)
    },
    validateSign(){
      return this.passwordCheck[0] && this.passwordCheckRules[0]
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


