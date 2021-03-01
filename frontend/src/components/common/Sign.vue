<template>
<transition name="slide-y-reverse-transition" appear>
  <v-dialog
    v-model="loginDialogShow"
    width="700"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" 
        outlined 
        rounded 
        color="primary"
        v-bind="attrs"
        v-on="on"
        v-show="!$store.state.isLogin"
      >
        로그인
      </v-btn>
      <v-btn class="ma-2" 
        outlined 
        rounded 
        color="primary"
        v-show="$store.state.isLogin"
        @click="logout()"
      >
        로그아웃
      </v-btn>
    </template>

    <v-card class="pa-0">
      <v-row>
        <v-col>
        </v-col>
        <v-col
          class="col-8"
        >
          <v-row>
            <v-spacer />
            <v-btn
              text
              small
              fab
              @click="closeLoginDialog()"
              class="mr-6"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-card-title
          >
            <v-img class="mr-2" src="../../assets/logo/leaflog_symbol.png" max-width=26 height=26 contain></v-img>
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
              ></v-text-field>
          
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="비밀번호"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="primary"
                class="align-center"
                text
                outlined
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
    </v-card>
  </v-dialog>
</transition>
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
        this.$axios.post('/api/auth/login', data, null)
          .then(response => {
            let id = JSON.parse(atob(response.data.token.split('.')[1])).id
            if(id.length === 0){
              alert('오류')
            }else {
              this.$axios.get('/api/auth/' + id)
              .then(res => {
                this.$Storage.setUser(res.data.data, true)
                this.$store.dispatch('login', response.data)
                location.reload()
                this.closeLoginDialog()
              })
            }
          })
          .catch(err => {
            console.log('login error -> ' + err)
            this.closeLoginDialog()
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