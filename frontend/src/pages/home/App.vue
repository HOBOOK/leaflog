<template>
  <v-app id="app" :style="{background: $vuetify.theme.themes[theme].background}">
    <v-navigation-drawer
      app
      class="d-flex pt-12"
      floating
      clipped
      color="background"
    >
      <v-list
        class="mr-4"
        :style="'border-right:1px solid ' + $vuetify.theme.themes[theme].second"
        dense 
        flat
        nav>
        <v-list-item
          class="mt-0 mb-0 pt-0 pb-0"
          color="primary"
          v-for="item in menus"
          :key="item.text"
          :to="item.link"
          :ripple="false"
        >
          
          <v-list-item-action class="mr-3">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-show="$router.currentRoute.meta.tree">
          <v-subheader
            class="mt-6 grey--text text--darken-1">페이지 트리
          </v-subheader>
          <v-treeview v-cloak dense transition :items="root" style="font-size:0.78rem">
            <template slot="label" slot-scope="props">
              <span style="cursor:pointer" @click="$Common.goLeafRoute(user.id, props.item.name)">{{props.item.name ? props.item.name : ''}}</span>
            </template>
          </v-treeview>
        </div>
        <div v-show="$store.state.isLogin">
          <v-subheader class="mt-6 grey--text text--darken-1">구독</v-subheader>
          <v-list
            dense
            v-if="subscribes !== null && subscribes.length > 0"
            >
            <v-list-item
              v-for="item in subscribes"
              :key="item.id"
              :to="item.link"
              link
            >
              <v-list-item-avatar size=28>
                <img
                  :src="`https://randomuser.me/api/portraits/men/${item.avatar}.jpg`"
                  alt=""
                >
              </v-list-item-avatar>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      flat
      class="header"
      :class="scrollPosition === 0 ? 'off-shadow' : ''"
      color="background"
    >
      <v-toolbar-title class="align-left" style="cursor: pointer;" @click="$Common.goRoute('/')">
        <v-row>
          <v-img class="ml-4" src="../../assets/logo/leaflog_symbol.png" height=26 width=26></v-img>
          <v-img class="d-none d-sm-flex" src="../../assets/logo/leaflog.png" height=26 width=120 contain></v-img>
        </v-row>
      </v-toolbar-title>
      <v-spacer />
      <div v-show="$store.state.isLogin">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" 
            outlined 
            rounded 
            v-bind="attrs"
            color="primary"
            v-on="on"
            @click="$Common.goRoute('/edit?=' + $Common.getCurrentRouteArticleInfo())"
            ><v-icon>mdi-plus</v-icon>나뭇잎 생성</v-btn>
          </template>
        <span>로그 작성</span>
        </v-tooltip>
        
      </div>
      <v-icon class="ma-1" @click="$Common.goRoute('/search/keyword/')">mdi-magnify</v-icon>
      <v-badge
            color="primary"
            dot
            overlap
            :content="alerts"
            :value="alerts"
          >
        <v-icon class="ma-1" @click="$Common.goRoute('/search/keyword/')">mdi-bell-outline</v-icon>
      </v-badge>
      <SignComponent></SignComponent>
    </v-app-bar>

    <v-main class="mx-8">
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <ho-talk>
    </ho-talk>
      
  </v-app>
</template>

<script>
import SignComponent from "../../components/common/Sign"
import HoTalk from '../../components/common/hotalk/HoTalk.vue'
import VueSticky from 'vue-sticky'
  export default {
    name: 'app',

    components: {
      SignComponent,
      HoTalk
    },
    directives:{
      sticky: VueSticky
    },
    props: {
      source: String,
    },
    data: () => ({
      alerts: 0,
      user:{},
      menus: [],
      subscribes: [],
      root: [],
      scrollPosition: 0,
    }),
    mounted () {
      this.findUsersById()
      this.findSubscribes()
    },
    created () {
      document.title = 'leaflog'
      window.addEventListener('scroll', this.scrollEvent);
    },
    methods: {
      scrollEvent(){
        this.scrollPosition = document.querySelector('html').scrollTop
      },
      async findUsersById() {
        if(this.$router.currentRoute.meta.tree) {
          await this.$axios.get('/api/auth/' + this.$router.currentRoute.params.id.substring(1))
          .then(res => {
            this.user = res.data.data
          })
        }else{
          this.user = this.$Storage.getUser()
        }
        this.menus = [
            { icon: 'mdi-trending-up', text: '트렌드', link: '/' },
            { icon: 'mdi-clock-time-seven-outline', text: '새로운', link: '/new' }
        ]
        if(this.user !== null) {
          if(this.$Storage.getUser() !==null && this.user.id === this.$Storage.getUser().id){
            this.menus.push({icon: 'mdi-tree-outline', text: '나의 나무', link: '/tree/@' + this.user.id + '/'})
          }
          else {
            this.menus.push({icon: 'mdi-tree-outline', text: this.user.id+'의 나무', link: '/tree/@' + this.user.id + '/'})
          }
          this.findLeafsById(this.user.id)
        }
        
      },
      findLeafsById(id) {
        this.$axios.get("http://localhost:3000/api/leafs/" + id)
          .then(res => {
            let datas = res.data.data
            this.root = datas.root
          })
          .catch(err => {
            console.log('fetch error leafs -> ' + err)
          })
      },
      async findSubscribes(){
        this.subscribes = []
        if(this.$Storage.getUser() === null){
           return
        } 
        for(let i = 0; i < this.$Storage.getUser().subscribes.length; i++) {
          await this.$axios.get("/api/auth/" + this.$Storage.getUser().subscribes[i])
          .then((res)=>{
            let subscribeModel = {
              id: res.data.data.id,
              name: res.data.data.name,
              avatar: res.data.data.avatar,
              link: '/tree/@' + res.data.data.id+'/'
            }
            this.subscribes.push(subscribeModel)
          })
        }
      }
    },
    computed: {
      theme(){
        return (this.$vuetify.theme.dark) ? 'dark' : 'light'
      }
    },
    watch: {
      '$route' (to) {
        this.findUsersById()
        if(to.meta.title === 'leaf'){
          document.title = to.params.key
        }
        else if(to.meta.title ==='tree'){
          document.title = to.params.id +'의 나무'
        }
        else
          document.title = 'leaflog | ' + to.meta.title
      }
    },
    
  }
</script>
<style lang="scss">
  @import '../../../scss/main.scss';
  @import '../../../scss/common.scss';
</style>