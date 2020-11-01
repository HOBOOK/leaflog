<template>
  <v-app id="sign">
      <SignComponent></SignComponent>
  </v-app>
</template>

<script>
  import axios from "axios"
  import SignComponent from "./components/common/Sign"
  export default {
    name: 'app',

    components: {
      SignComponent
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      alerts: 0,
      userId: '',
      items: [],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
      root: [],
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
    computed: {

    },
    methods: {
      getTest() {
        console.log('test')
        return "sss"
      },
      async findLeafsById(id) {
        await axios.get("http://localhost:3000/api/leafs/" + id)
          .then(response => {
            
            let datas = response.data.data.leafs
            this.root = datas.root
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
  .v-overlay__scrim {
    background-color: rgb(230,230,230) !important;
    border-color: rgb(230,230,230) !important;
  }
  .v-dialog {
    box-shadow: 0 2px 30px -1px rgba(85,85,85,.08), 0 4px 30px 0 rgba(85,85,85,.06), 0 1px 30px 0 rgba(85,85,85,.03) !important;
  }
</style>