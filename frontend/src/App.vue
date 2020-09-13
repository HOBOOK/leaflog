<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
        
      <v-list dense>
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
        <div v-show="this.currentPath().indexOf('/board') !== -1">
        <v-subheader class="mt-4 grey--text text--darken-1">문서</v-subheader>
          <v-treeview dense :items="documents" style="font-size:0.78rem" :open-on-click="true">
            <template slot="label" slot-scope="props">
              <span style="cursor:pointer" @click="goRoute('/board/id/'+props.item.name)">{{props.item.name}}</span>
            </template>
          </v-treeview>
          </div>
        <v-subheader class="mt-4 grey--text text--darken-1">구독</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list-item
          class="mt-4"
          link
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      dense
      flat
      color="#E6EE9C"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="align-center" style="cursor: pointer;" @click="goRoute('/')">
        <v-img src="./assets/logo/leaflog.png" height=25 width=64 contain></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import documents from './database/documents.json'

  export default {
    name: 'App',

    components: {

    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'mdi-home', text: '홈', link: '/' },
        { icon: 'mdi-dialpad', text: '마이로그', link: '/board/id/' },
        { icon: 'mdi-foot-print', text: '발자취', link: '/footprint/id/'},
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
      documents: documents,
      currentPath: function(){
        return this.$router.currentRoute.path;
      }
    }),
    created () {
      this.$vuetify.theme.dark = false
      document.title = 'leaflog'
    },
    methods: {
      goRoute(route){
        this.$router.push(route);
      },
    },
    watch: {
      '$route' (to) {
        document.title = to.meta.title || 'leaflog'
      }
    },
    
  }
</script>
<style>
  html{
    background-color:black;
  }
</style>