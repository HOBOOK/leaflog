<template>
    <v-col
      cols="12"
      :md="size === 2 ? 6 : size === 3 ? 4 : undefined"
    >
      <base-card
        :height="value.prominent ? 300 : 270"
        color="grey lighten-1"
        dark
        @click="$Common.goRoute('/tree/@' + value.author + '/' + value.title)"
      >
        <v-img
          :src="require(`@/assets/articles/${value.thumbnail}`)"
          height="100%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >
          <v-row
            v-if="!value.prominent"
            class="fill-height text-right ma-0"
          >
            <v-col cols="12">
              <span class="text-h6 title font-weight-bold mb-2">
                {{ value.title }}
              </span>

              <div class="caption mt-8">
                <v-avatar
                  size="32"
                  class="ma-2">
                    <img
                      :src="require(`@/assets/articles/${value.thumbnail}`)"
                      alt="avatar"
                    >
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">{{ value.author }}</span>
                  <br/>
                <span class="text-body-3">조회수 3.5만 | {{ $Time.dateToFormatForToday(value.date) }}</span>
              </div>
            </v-col>

            <v-col align-self="end">
              <v-row align-self="left">
                <!-- <v-chip
                  class="ma-2 text-uppercase"
                  color="transparent"
                  text-color="white"
                  small
                  @click.stop=""
                >
                  #{{ value.category }}
                </v-chip> -->
                <v-spacer />
                <v-badge
                  color="blue darken-2"
                  overlap
                  left
                  :content="value.water.toString()"
                  class="mr-2 text-caption"
                >
                  <v-icon class="ma-0" large color="blue darken-2">mdi-water-outline</v-icon>
                </v-badge>
              </v-row>
            </v-col>
          </v-row>
        </v-img>
      </base-card>
    </v-col>
</template>

<script>
  export default {
    name: 'FeedCard',

    props: {
      size: {
        type: Number,
        required: true,
      },
      value: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>

<style>
.v-image__image {
  transition: .3s linear;
}
</style>
