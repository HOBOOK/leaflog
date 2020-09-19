<template>
  <section id="feed">
    <Feed>
    </Feed>
  </section>
</template>

<script>
  export default {
    name: 'Main',

    components: {
      Feed: () => import('@/components/Feed'),
    },
  }
</script>