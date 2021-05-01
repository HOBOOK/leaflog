<template>
<transition name="slide-y-reverse-transition" appear>
  <v-text-field class="ma-10"
    rounded
    outlined
    solo
    flat
    hide-details
    color="primary"
    label="무슨 나뭇잎을 찾으시나요?"
    prepend-inner-icon="mdi-magnify"
    style="border:1px solid"
  ></v-text-field>
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