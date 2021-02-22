<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list
        dense 
        flat
        nav>
        <v-list-item
          color="primary"
          v-for="item in menus"
          :key="item.text"
          :to="item.link"
          v-show="item.show"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-show="$store.state.isLogin">
          <v-subheader
            class="mt-6 grey--text text--darken-1">페이지 트리
          </v-subheader>
          <v-treeview v-cloak dense transition :items="root" style="font-size:0.78rem">
            <template slot="label" slot-scope="props">
              <span style="cursor:pointer" @click="$Common.goRoute('/tree/@' + user.id + '/' +props.item.name)">{{props.item.name ? props.item.name : ''}}</span>
            </template>
          </v-treeview>
        </div>
        <!-- <v-divider class="mt-2 mb-2"></v-divider> -->
        <div v-show="$store.state.isLogin">
          <v-subheader class="mt-6 grey--text text--darken-1">구독</v-subheader>
          <v-list
            dense
            v-show="$store.state.isLogin"
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
        <v-divider class="mt-2 mb-2"></v-divider>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">설정</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      flat
      color="#FFFFFF" style="border:1px solid rgba(0,0,0,0.0);"
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="align-left" style="cursor: pointer;" @click="$Common.goRoute('/')">
        <v-row>
          <v-img src="../../assets/logo/leaflog_symbol.png" height=26 width=26></v-img>
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

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <ho-talk>
    </ho-talk>
      
  </v-app>
</template>

<script>
import SignComponent from "../../components/common/Sign"
import HoTalk from '../../components/common/hotalk/HoTalk.vue'

  export default {
    name: 'app',

    components: {
      SignComponent,
      HoTalk
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      alerts: 0,
      user:{},
      menus: [],
      subscribes: [],
      root: [],
      currentPath: function(){
        return this.$router.currentRoute.path;
      }
    }),
    mounted () {
      if(this.$store.state.isLogin)
        this.findUsersById()
    },
    created () {
      document.title = 'leaflog'
    },
    methods: {
      async findLeafsById(id) {
        console.log(id)
        await this.$axios.get("http://localhost:3000/api/leafs/" + id)
          .then(res => {
            let datas = res.data.data
            this.root = datas.root
          })
          .catch(err => {
            console.log('fetch error leafs -> ' + err)
          })
      },
      findUsersById() {
        let id = 'pkh879'
        this.$axios.get("http://localhost:3000/api/auth/" + id)
          .then(res => {
            this.user = res.data.data
            this.menus = [
                { icon: 'mdi-terrain', text: '숲', link: '/', show: true },
                { icon: 'mdi-tree-outline', text: '나의 나무', link: '/tree/@' + this.user.id + '/', show: this.$store.state.isLogin },
                { icon: 'mdi-foot-print', text: '발자취', link: '/footprint/@' + this.user.id + '/', show: this.$store.state.isLogin },
              ]
            this.findLeafsById(this.user.id)
            this.findSubscribes(this.user.subscribes)
          })
          .catch(err => {
            console.log(err)
          })
      },
      async findSubscribes(subscribes){
        for(let i = 0; i < subscribes.length; i++) {
          await this.$axios.get("http://localhost:3000/api/auth/" + subscribes[i])
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
    watch: {
      '$route' (to) {
        document.title = 'leaflog | ' + to.meta.title
      }
    },
    
  }
</script>
<style>
  html{
    background-color:#FFFFFF;
  }
  .v-navigation-drawer__border {
    display: none;
  } 
  .v-overlay__scrim {
    background-color: rgb(230,230,230) !important;
    border-color: rgb(230,230,230) !important;
  }
  .v-dialog {
    box-shadow: 0 2px 30px -1px rgba(85,85,85,.08), 0 4px 30px 0 rgba(85,85,85,.06), 0 1px 30px 0 rgba(85,85,85,.03) !important;
  }
</style>