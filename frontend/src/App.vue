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
          <v-treeview dense :items="documents" style="font-size:0.78rem">
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
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon
        class="mx-4"
        large
      >
        mdi-blogger
      </v-icon>
      <v-toolbar-title class="mr-12 align-center" style="cursor: pointer" @click="goRoute('/')">
        <span class="title">Ho-blog</span>
      </v-toolbar-title>
    
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content height="100%">
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
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
        { icon: 'mdi-calendar', text: '달력', link: '/calendar/id/'}
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
      documents: [
        {
          id: 1,
          name: '문서1',
          children: [
            { id: 2, name: '문서1-1' },
            { id: 3, name: '문서1-2' },
            { id: 4, name: '문서1-3' },
          ],
        },
        {
          id: 5,
          name: '문서2',
          children: [
            { id: 6, name: '문서2-1' },
            { id: 7, name: '문서2-2' },
            { id: 8, name: '문서2-3' },
          ],
        },
      ],
      currentPath: function(){
        return this.$router.currentRoute.path;
      }
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      goRoute(route){
        this.$router.push(route);
      },
    },
    
  }
</script>