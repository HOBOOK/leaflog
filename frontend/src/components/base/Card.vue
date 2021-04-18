<template>
  <v-card
    flat
    tile
    v-bind="$attrs"
    v-on="$listeners"
    class="rounded ma-2 pa-0"
  >
    <slot />
  </v-card>
</template>

<script>
  export default {
    name: 'BaseCard',
  }
</script>
