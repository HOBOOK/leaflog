<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.link"
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
        <div v-show="this.currentPath().indexOf('/tree') !== -1">
        <!-- <v-divider class="mt-2 mb-2"></v-divider> -->
        <v-subheader class="mt-6 grey--text text--darken-1">나의 나뭇잎</v-subheader>
          <v-treeview v-cloak dense :items="leafs" style="font-size:0.78rem" :open-on-click="true">
            <template slot="label" slot-scope="props">
              <span style="cursor:pointer" @click="goRoute('/tree/@' + userId + '/' +props.item.name)">{{props.item.name ? props.item.name : ''}}</span>
            </template>
          </v-treeview>
          </div>
        <!-- <v-divider class="mt-2 mb-2"></v-divider> -->
        <v-subheader class="mt-6 grey--text text--darken-1">구독</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar size=28>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
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
      color="#FFFFFF" style="border:1px solid rgba(0,0,0,0.12);"
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="align-left" style="cursor: pointer;" @click="goRoute('/')">
        <v-row>
          <v-img src="./assets/logo/leaflog_symbol.png" height=26 width=26 contain></v-img>
          <v-img src="./assets/logo/leaflog.png" height=26 width=120 contain></v-img>
        </v-row>
      </v-toolbar-title>
      <v-spacer />
      <div v-show="this.currentPath().indexOf('/tree') !== -1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" 
            outlined 
            rounded 
            v-bind="attrs"
            color="#827717"
            v-on="on"><v-icon>mdi-plus</v-icon>나뭇잎 생성</v-btn>
          </template>
        <span>로그 작성</span>
        </v-tooltip>
        
      </div>
      <v-icon class="ma-1" @click="goRoute('/search/keyword/')">mdi-magnify</v-icon>
      <v-badge
            color="#827717"
            dot
            overlap
          >
        <v-icon class="ma-1" @click="goRoute('/search/keyword/')">mdi-bell-outline</v-icon>
      </v-badge>
      <v-btn class="ma-2" outlined rounded color="#827717">로그인</v-btn>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
      
  </v-app>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'App',

    components: {
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      userId: '',
      items: [],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
      leafs: [],
      currentPath: function(){
        return this.$router.currentRoute.path;
      }
    }),
    mounted () {

    },
    created () {
      this.$vuetify.theme.dark = false
      document.title = 'leaflog'
      this.userId = 'pkh879'
      this.items = [
        { icon: 'mdi-terrain', text: '숲', link: '/' },
        { icon: 'mdi-tree-outline', text: '나의 나무', link: '/tree/@' + this.userId + '/' },
        { icon: 'mdi-foot-print', text: '발자취', link: '/footprint/@' + this.userId + '/'},
      ],
      this.findLeafsById(this.userId)
    },
    methods: {
      goRoute(route){
        if (this.$route.path !== route)
          this.$router.push(route);
      },
      async findLeafsById(id) {
        await axios.get("http://localhost:3000/api/leafs/" + id)
          .then(response => {
            
            let datas = response.data.data.leafs
            this.leafs = datas.leafs
            console.log('fetch sucess leafs -> ')
          })
          .catch(err => {
            console.log('fetch error leafs -> ' + err)
          })
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
</style>