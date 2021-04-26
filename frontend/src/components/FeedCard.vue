<template>
    <v-col
      class="ma-0 pa-0 col-sm-6 col-md-4 col-lg-4 col-xl-3"
    >
      <div class="feed-card-container ma-4 pa-0">
        <v-card
          flat
          tile
          class="ma-0 pa-0"
        >
          <span @click="$Common.goLeafRoute(value.author, value.title)" style="cursor:pointer;">
            <v-img
              v-if="value.thumbnail.length > 0 && !thumbnailError"
              :src="$File.getImage(value.thumbnail)"
              @error="thumbnailError = true"
              :height="192"
              gradient="rgba(0, 0, 0, .42), rgba(30, 30, 30, .56)"
            >
            </v-img>
            <v-row v-else
              class="ma-0 pa-0"
              justify="center"
              align="center"
              style="height:192px !important; font-family:Nanum Myeongjo !important; font-size:1.2em;">
                 “Only Text”
            </v-row>
            <v-row
              class="text-left my-2 mx-4 px-0 pt-2 feed-card-title"
            >
              <span class="font-weight-bold">
                {{ value.title }}
              </span>
            </v-row>
            <v-row
              class="text-left mx-4 mb-4 px-0 pb-2 feed-card-content"
            >
              {{ $Common.replaceTag(value.content)}}
            </v-row>
          </span>
          <v-row class="text-right text-caption mx-4 px-0 pb-2" align="center">
            <v-spacer/>
            <v-icon small left color="primary">mdi-feather</v-icon>
            <span class="font-weight-bold mr-2">{{ value.author }}</span>
            <v-avatar
              size="32"
            >
              <img
                :src="$File.getAvatar(value.authorAvatar)"
                alt="avatar"
              >
            </v-avatar>
          </v-row>
          <v-row class="mx-4 px-0 pb-2 text-caption color-caption" justify="end" align="center">
            <span class="pr-2">
              <v-icon small class="ma-1">mdi-clock-time-seven-outline</v-icon>{{ $Time.dateToFormatForToday(value.date) }}
            </span>
            <span class="pr-2">
              <v-icon small class="ma-1">mdi-eye-outline</v-icon>{{$Common.convertNumberUnit(value.view)}}
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
    },

    data: () => ({
      thumbnailError: false
    }),
  }
</script>

<style lang="scss">
  @import '../../scss/feed.scss';
  .v-image__image {
    transition: .3s linear;
  }
</style>
