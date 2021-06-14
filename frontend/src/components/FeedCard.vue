<template>
    <v-col
      class="ma-0 pa-0 col-12 col-md-6 col-lg-4 col-xl-3"
      style="position:relative;"
    >
      
      <div class="feed-card-container ma-4 pa-0"
      >
        
        <v-card
          flat
          tile
          class="ma-0 pa-0"
          v-if="value !== null && isLoad"
        >
          <v-container>
          <v-hover v-slot="{ hover }" :close-delay="100" :open-delay="100">
          <span @click="$Common.goLeafRoute(value.author, value.title)" style="cursor:pointer;">
            
            
            <v-row 
              class="ma-0 pa-0 card-thumbnail"
              justify="center"
              align="center"
              style="height:15rem !important; position:relative; border:1px solid #eee;"
              :class="hover ? 'on' : ''"   
            >
              <v-img
                v-if="value.thumbnail.length > 0 && !thumbnailError"
                :src="$File.getImage(value.thumbnail)"
                @error="thumbnailError = true"
                gradient="rgba(0, 0, 0, .1), rgba(30, 30, 30, .15)"
                style="height:100%"
                class="card-thubmnail"
                :class="hover ? 'on' : ''" 
            >
            </v-img>
                 
              <span v-else style="font-family:Nanum Myeongjo !important; font-size:1.2em; ">“Only Text”</span>
            </v-row>

           
            <v-row
              class="text-left my-2 mx-4 px-0 pt-2 feed-card-title"
              :class="hover ? 'on' : ''" 
            >
              <span class="font-weight-bold">
                {{ value.title }}
              </span>
            </v-row>
            <v-row class="mx-4 px-0 feed-card-content" :class="hover ? 'on' : ''">
                  
              <span v-html="typeof value.content !== 'undefined' ? value.content.substring(0,1000) : value.content"></span>
            </v-row>
          </span>
          </v-hover>
          <v-row class="text-right text-caption ma-0 px-0 pb-2 feed-card-info" align="center">
            <v-col>
              <v-row class="text-caption color-caption ma-0 pa-0" justify="start" align="center">
                <span class="pr-0">
                  <v-icon small class="ma-1">mdi-clock-time-seven-outline</v-icon>{{ $Time.dateToFormatForToday(value.date) }}
                </span>
                <span class="pr-0">
                  <v-icon small class="ma-1">mdi-eye-outline</v-icon>{{$Common.convertNumberUnit(value.view)}}
                </span>
                <span class="pr-0">
                  <v-icon small class="ma-1" color="blue darken-2">mdi-water-outline</v-icon>
                  <span v-text="value.water.toString()"></span>
                </span>
              </v-row>
            </v-col>
            <v-col>
              <v-row  class="ma-0 pa-0" justify="end" align="center">
                <v-icon small left color="primary">mdi-feather</v-icon>
                <div>
                  <span class="font-weight-bold mr-2" v-if="value.authorModel">{{ value.authorModel.name }}</span>
                  <v-avatar
                    size="32"
                  >
                    <img
                      :src="$File.getAvatar(value.authorAvatar)"
                      alt="avatar"
                    >
                  </v-avatar>
                </div>
              </v-row>
            </v-col>
          </v-row>
          </v-container>
        </v-card>
        <v-skeleton-loader
          v-else
          tile
          class="ma-0 pa-0"
          type="image, card-heading, list-item-avatar-two-line"
        ></v-skeleton-loader>
        
      </div>
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
    }),

    methods:{
    }
  }
</script>

<style lang="scss">
  @import '../../scss/feed.scss';

</style>
