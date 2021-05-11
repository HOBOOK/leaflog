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
            <v-tab-item class="mt-8" transition="fade-transition" reverse-transition="fade-transition">
              <v-container fluid>
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
  }),

  mounted(){
    this.init()
  },

  methods:{
    init() {
    },
  }
};
</script>

<style lang="scss">
</style>


