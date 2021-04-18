<template>
    <v-col
      cols="4"
      class="ma-0 pa-0"
    >
      <div class="feed-card-container ma-2 pa-0">
        <v-card
          flat
          tile
          :max-height="370"
          class="ma-0 pa-0"
        >
          <span @click="$Common.goLeafRoute(value.author, value.title)" style="cursor:pointer;">
          <v-img
            :src="require(`@/assets/articles/${value.thumbnail}`)"
            :height="192"
            gradient="rgba(0, 0, 0, .42), rgba(50, 50, 50, .42)"
          >
          </v-img>
          <v-row
            class="text-left ma-2 pa-0 feed-card-title"
          >
            <span class="font-weight-bold">
              {{ value.title }}
            </span>
          </v-row>
          <v-row
            class="text-left mx-2 my-0 pa-0 feed-card-content"
          >
            {{value.content}}
          </v-row>
          </span>
          <v-row class="text-right text-caption ma-2 pa-0" align="center">
            <v-spacer/>
            <span class="font-weight-bold mr-2">{{ value.author }}</span>
            <v-avatar
              size="32"
            >
              <img
                :src="'https://randomuser.me/api/portraits/men/' + value.authorAvatar +'.jpg'"
                alt="avatar"
              >
            </v-avatar>
          </v-row>
          <v-row class="ma-2 pa-0 text-caption color-caption" justify="end" align="center">
            <span class="pr-2">
              <v-icon small class="ma-1">mdi-clock-time-seven-outline</v-icon>{{ $Time.dateToFormatForToday(value.date) }}
            </span>
            <span class="pr-2">
              <v-icon small class="ma-1">mdi-eye-outline</v-icon>3.5만
            </span>
            <span class="pr-0">
              <v-icon small class="ma-1" color="blue darken-2">mdi-water-outline</v-icon>
              <span v-text="value.water.toString()"></span>
            </span>
          </v-row>
        </v-card>
      </div>
    </v-col>
</template>

<script>
  export default {
    name: 'FeedCard',

    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
    }
  }
</script>

<style lang="scss">
  @import '../../scss/feed.scss';
  .v-image__image {
    transition: .3s linear;
  }
</style>
