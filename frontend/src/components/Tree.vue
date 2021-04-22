<template>
  <v-container>
    <v-layout column class="mt-16">
      <v-col class="align-center">
        <v-row class="ml-8">
          <v-row>
            <v-avatar size="128">
              <!-- <span class="white--text headline">아이</span> -->
              <v-img src="../assets/logo/leaflog_symbol.png"></v-img>
            </v-avatar>
          <v-col>
            <span class="ma-1 font-weight-bold" style="font-size:1.5rem">아이디</span>
            <br />
            <span class="ma-1" style="font-size:0.8rem">구독자 3명</span>
            <br />
            <span singleline class="ma-1" style="font-size:1.1rem">당신의 나무를 설명해주세요</span>
          </v-col>
          </v-row>
          <v-row class="align-end mr-8">
            <v-col class="d-flex flex-row-reverse">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="ma-4" large color="blue darken-2" v-bind="attrs"
              v-on="on" @click="console.log('dd')">mdi-water-outline</v-icon>
                </template>
                <span>물주기</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="ma-4" large color="blue-grey darken-2" v-bind="attrs"
              v-on="on" @click="console.log('dd')">mdi-bell-outline</v-icon>
                </template>
                <span>구독하기</span>
              </v-tooltip>
            </v-col>
            </v-row>
        </v-row>
      </v-col>
      <v-col>
        <v-divider></v-divider>
      </v-col>
      <v-col class="my-16" style="min-height: 900px;">
          <v-tabs
            background-color="white"
            centered
            grow
            color="#827717"
          >
            <v-tab :ripple="false" style="font-size:1.3rem; max-width:10rem">
              <v-img src="../assets/logo/leaflog_symbol.png" height=26 width=26 contain></v-img></v-tab>
            <v-tab :ripple="false" style="font-size:1.3rem; max-width:10rem">소개</v-tab>
      
            <v-tab-item class="mt-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <slot />
                  </v-col>
                  <feed-card
                    v-for="(article, i) in articles"
                    :key="article.title"
                    :index=i
                    :size=3
                    :value="article"
                  >
                  </feed-card>
                  <v-col class="text-center" col=12>
                  <v-progress-circular class="justify-center text-center" indeterminate color="#AFB42B" v-if="isFetching"></v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item class="mt-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container fluid>
                <v-row class="ma-0 pa-0">
                  <Footprint/>
                </v-row>
                <v-row>
                  <v-img src="../assets/vector/tree.png" aspect-ratio="1.7" max-height=300 contain></v-img>
                </v-row>
                <v-row justify="center" align="center" class="text-center">
                  <transition name="slide-y-reverse-transition" appear>
                    <h1 class="mt-8 display-1 font-weight-thin mb-4">당신의 나무를 소개해보세요</h1>
                  </transition>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
      </v-col>
      <v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'Tree',

    components: {
      FeedCard: () => import('@/components/FeedCard'),
      Footprint: () => import('@/components/Footprint')
    },


    data: () => ({
      page: 1,
      bottom: false,
      isFetching: false,
      articles: []
    }),

    computed: {
      pages () {
        return Math.ceil(this.articles.length / 11)
      }
    },

    created() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
      this.articles = []
      this.fetchData()
    },

    watch: {
      bottom(bottom) {
        if (bottom) {
          this.fetchData()
        }
      }
    },

    methods: {
      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      },
      async fetchData() {
        if(this.isFetching) return
        this.isFetching = true
        await axios.get("/articles/" + this.$router.currentRoute.params.id.substring(1) + "?page=" + this.page)
          .then(response => {
            let datas = response.data.data
            for(let i = 0; i < datas.length; i++) {
              let article = {
                title : datas[i].title,
                author : datas[i].author,
                category : datas[i].category,
                thumbnail: datas[i].thumbnail.length === 0 ? 'ancient.jpg' : datas[i].thumbnail,
                prominent: datas[i].prominent,
                private: datas[i].private,
                water: datas[i].water,
                date: datas[i].date
              }
              if (this.articles.indexOf(article) === -1) this.articles.push(article)
            }
            this.isFetching = false
            
            this.page++
          })
          .catch(err => {
            this.isFetching = false
            console.log('fetch error -> ' + err)
          })
      }
    }
  }
</script>
