<template>
    <v-col
      class="ma-0 pa-0 col-sm-6 col-md-4 col-lg-4 col-xl-3"
      style="position:relative;"
    >
      <v-hover v-slot="{ hover }" :close-delay="300">
      <div class="feed-card-container ma-4 pa-0"
        @mouseover="hoverCard"
        @mouseleave="leaveCard"
        :style="hoverStatus ? 'position:absolute;z-index:2;' : 'position:static;z-index:1;'"
      >
        <v-card
          flat
          tile
          class="ma-0 pa-0"
          v-if="value !== null && isLoad"
        >
          <span @click="$Common.goLeafRoute(value.author, value.title)" style="cursor:pointer;">
            <v-img
              v-if="value.thumbnail.length > 0 && !thumbnailError"
              :src="$File.getImage(value.thumbnail)"
              @error="thumbnailError = true"
              :height="256"
              gradient="rgba(0, 0, 0, .1), rgba(30, 30, 30, .15)"
            >
            </v-img>
            <v-row v-else
              class="ma-0 pa-0"
              justify="center"
              align="center"
              style="height:256px !important; position:relative;">
                 
              <span style="font-family:Nanum Myeongjo !important; font-size:1.2em; ">“Only Text”</span>
            </v-row>
            <v-row
              class="text-left my-2 mx-4 px-0 pt-2 feed-card-title"
            >
              <span class="font-weight-bold">
                {{ value.title }}
              </span>
            </v-row>
            <v-row class="mx-4 px-0 feed-card-content"
                  :class="hover ? 'on':''">
                  
              <span v-html="typeof value.content !== 'undefined' ? value.content.substring(0,1000) : value.content"></span>
            </v-row>
          </span>
          <v-row class="text-right text-caption mx-4 px-0 pb-2 feed-card-info" :class="hover ? 'on' : ''" align="center">
            <v-spacer/>
            <v-icon small left color="primary">mdi-feather</v-icon>
            <span class="font-weight-bold mr-2" v-if="value.authorModel">{{ value.authorModel.name }}</span>
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
        <v-skeleton-loader
          v-else
          tile
          class="ma-0 pa-0"
          type="image, card-heading, list-item-avatar-two-line"
        ></v-skeleton-loader>
        
      </div>
      </v-hover>
    </v-col>
</template>

<script>
  export default {
    name: 'FeedCard',

    props: {
      value: {
        type: Object,
        default: () => (null),
      },
    },

    mounted() {
      this.isLoad = true
    },

    watch:{
      value(){
        if(this.value !== null) {
          this.isLoad = true
        }else{
          this.isLoad = false
        }
      },
    },

    data: () => ({
      isLoad: false,
      thumbnailError: false,
      hoverStatus: false
    }),

    methods:{
      hoverCard(){
        this.hoverStatus = true
      },
      leaveCard(){
        this.hoverStatus = true
        setTimeout(()=>{
          this.hoverStatus = false
        },550)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/feed.scss';
  .v-image__image {
    transition: .3s linear;
  }

</style>
