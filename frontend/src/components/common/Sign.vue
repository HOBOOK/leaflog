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
      
      
      <v-avatar
        v-else
        size="32"
        class="mx-4"
        @click="logout()"
      >
        <v-img
          :src="$File.getAvatar($Storage.getUser().avatar)">
        </v-img>
      </v-avatar>
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
              <v-img class="my-4" src="../../assets/logo/leaflog.png" height=26 contain></v-img>
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
          >
            로그인
          </v-card-title>
          
          <v-card-text>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mr-16"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="이메일"
                required
                solo
                flat
                hide-details
                style="border-bottom:1px solid #f0f0f0;"
              ></v-text-field>
          
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="비밀번호"
                required
                hide-details
                solo
                flat
                style="border-bottom:1px solid #f0f0f0;"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="primary"
                class="align-center mt-4"
                text
                outlined
                rounded
                @click="validate"
              >
                들어가기
              </v-btn>
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
              >
                <v-icon large color="#4285F4">
                  mdi-google
                </v-icon>
              </v-btn>
              <v-btn
                fab
                text
              >
                <v-icon large color="#4285F4">
                  mdi-facebook
                </v-icon>
              </v-btn>
              <v-btn
                fab
                text
              >
                <v-icon large color="#24292e">
                  mdi-github
                </v-icon>
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
        valid: false
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
      validate() {
        this.login()
      },
      login() {
        let data = {
          email: this.email,
          password: this.password
        }
        this.$axios.post('/auth/login', data, null)
          .then(response => {
            let id = JSON.parse(atob(response.data.token.split('.')[1])).id
            if(id.length === 0){
              alert('오류')
            }else {
              this.$axios.get('/auth/' + id)
              .then(res => {

                this.$Storage.setUser(res.data.data, true)
                this.$store.dispatch('login', response.data.token)
                this.closeLoginDialog()
                location.reload()
              })
            }
          })
          .catch(err => {
            console.log('login error -> ' + err)
            this.$store.commit('setAlert', '로그인 실패')
          })
      },
      logout() {
        this.$store.dispatch('logout')
        location.reload()
      }
    }
}
</script>
<style scoped>
  div >>> .v-card {
    overflow: hidden;
  }
</style>