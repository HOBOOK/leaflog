<template>
    <v-container>
        <v-row justify="center" align="center" class="my-8 text-center">
        <v-tabs
            background-color="white"
            centered
            grow
            color="#827717"
          >
            <v-tab :ripple="false" style="font-size:1.3rem; max-width:10rem">계정</v-tab>
            <v-tab :ripple="false" style="font-size:1.3rem; max-width:10rem">시스템</v-tab>
            <v-tab :ripple="false" style="font-size:1.3rem; max-width:10rem">로그</v-tab>
      
            <v-tab-item class="mt-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container fluid>
                <v-row justify="center">
                  <div class="profile-content">
                    <div class="profile-img">
                        <v-avatar size="160"
                        >
                            <img
                              v-img
                                ref="profileImage"
                                :src="avatar"
                            />
                        </v-avatar>
                    </div>
                    <div>
                        <label class="profile-image-upload pa-1">
                        사진 변경
                        <v-file-input 
                            v-model="avatar"
                            accept="image/png, image/jpeg, image/bmp"
                            dense
                            @change="inputImageChange"
                            hide-input
                        />
                        </label> 
                    </div>
                  </div>
                </v-row>
                <v-row justify="center">
                  <span v-if="!editMode" class="text-h4 font-weight-bold py-4">
                    {{user.name}}
                  </span>
                  <v-text-field 
                    v-else
                    v-model="user.name"
                    hide-details
                    outline
                    single-line
                    class="text-h4 font-weight-bold py-4 centered-input"
                    style="max-width:300px;"
                  >
                  </v-text-field>
                </v-row>
                <v-row justify="center">
                  <span v-if="!editMode" @click="editMode = true" style="cursor:pointer;">
                    <v-icon small left>mdi-comment-edit-outline</v-icon>수정
                  </span>
                  <span v-else @click="editMode = false" style="cursor:pointer;">
                    <v-icon small left>mdi-content-save-outline</v-icon>저장
                  </span>
                </v-row>
                <v-row align="center"> 
                  <v-card flat>
                    <v-card-title>
                      이메일 주소
                    </v-card-title>
                    <v-card-text>
                      {{user.email}}
                    </v-card-text>
                  </v-card>
                  <v-spacer/>
                </v-row>
                <v-row align="center"> 
                  <v-card flat>
                    <v-card-title>
                      이메일 수신
                    </v-card-title>
                    <v-card-text>
                      새로운 소식을 이메일로 수신합니다.
                    </v-card-text>
                  </v-card>
                  <v-spacer/>
                  <v-switch
                    v-model="user.config"
                    inset
                    dense
                    :hide-details="true"
                    class="setting-switch"
                ></v-switch>
                </v-row>
                <v-row align="center">
                  <v-card flat>
                    <v-card-title>
                      계정삭제
                    </v-card-title>
                    <v-card-text>
                      계정삭제시 작성된 데이터가 모두 삭제되고 복구는 불가능합니다.
                    </v-card-text>
                  </v-card>
                  <v-spacer/>
                  <v-btn rounded outlined color="error">
                    계정삭제
                  </v-btn>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item class="mt-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container fluid>
                <v-row justify="center" align="center" class="text-center">
                  
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item class="mt-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container fluid>
                <v-row justify="center" align="center" class="text-center">
                  
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Setting',

  components: {
  },

  created(){
  },

  computed:{
  },

  data: () => ({
    user: null,
    avatar: '',
    editMode: false
  }),

  mounted(){
    this.init()
  },

  methods:{
    init() {
      this.user = this.$Storage.getUser()
      this.avatar = this.$File.getAvatar(this.user.avatar)
    },
    inputImageChange(event){
      this.user.avatar = this.$Storage.getUser().id + "/avatar" + event.name.substring(event.name.lastIndexOf('.'))
      this.avatar = window.URL.createObjectURL(event)
      //await this.$File.upload(this.user.avatar, this.event)
    },
  }
};
</script>

<style lang="scss">
.profile-content{
  position:relative;
  display:inline-block;
  &:hover{
    .profile-image-upload{
      opacity: 1 !important;
    }
  }
  .profile-image-upload{
    transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    opacity: 0;
    position:absolute !important;
    background-color:rgba($color: #333, $alpha: 0.5);
    top:0 !important;
    right:0;
    height:30px;
    border-radius: 5px;
    color:#fff !important;
    cursor: pointer;
    display: block;
    text-align: center;
    
  }
  .static{
    opacity: 1 !important;
  }
  .v-text-field{
    display: none;
  }
}
</style>


