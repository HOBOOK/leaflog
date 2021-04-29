<template>
    <v-col
      class="ma-0 pa-0 col-sm-6 col-md-4 col-lg-4 col-xl-3"
    >
      <div class="feed-card-container ma-4 pa-0">
        <v-hover v-slot="{ hover }">
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
              :height="256"
              gradient="rgba(0, 0, 0, .1), rgba(30, 30, 30, .15)"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%;"
                >
                  <p v-html="value.content.substring(0,1000)"></p>
                </div>
              </v-expand-transition>
            </v-img>
            <v-row v-else
              class="ma-0 pa-0"
              justify="center"
              align="center"
              style="height:256px !important; position:relative;">
                 
              <span style="font-family:Nanum Myeongjo !important; font-size:1.2em; ">“Only Text”</span>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%;"
                >
                  <p v-html="value.content.substring(0,1000)"></p>
                </div>
              </v-expand-transition>
            </v-row>
            <v-row
              class="text-left my-2 mx-4 px-0 pt-2 feed-card-title"
            >
              <span class="font-weight-bold">
                {{ value.title }}
              </span>
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
        </v-hover>
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
  .v-card--reveal {
    align-items: center;
    top: 0;
    justify-content: center;
    background-color:rgba(190,220,180,0.7);
    backdrop-filter: blur(2px);
    font-size:0.7em;
    color:#333;
    opacity: 0.7 !important;
    position: absolute;
    width: 100%;
    max-width:100%;
    overflow: hidden;
  }
</style>
