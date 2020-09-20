<template>
<transition name="slide-y-reverse-transition" appear>
  <v-form>
  <v-text-field class="ma-10"
    rounded
    outlined
    solo
    flat
    label="무슨 나뭇잎을 찾으시나요?"
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
  </v-form>
</transition>
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