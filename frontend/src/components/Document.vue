<template>
<v-col class="text-center" cols="12">
  <transition name="slide-y-reverse-transition" appear>
    <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
  </transition>
  <h4 class="subheading">{{this.currentPath}}</h4>
</v-col>
</template>

<script>
export default {
    data () {
      return {
        currentPath: this.getCurrentPath()
      }
    },
    methods: {
      getCurrentPath: function(){
        return this.$router.currentRoute.path;
      },
    }
}
</script>