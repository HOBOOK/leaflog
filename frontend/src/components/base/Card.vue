<template>
  <v-card
    flat
    tile
    v-bind="$attrs"
    v-on="$listeners"
    class="rounded-lg"
  >
    <slot />
  </v-card>
</template>

<script>
  export default {
    name: 'BaseCard',
  }
</script>
