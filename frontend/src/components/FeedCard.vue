<template>
    <v-col
      cols="12"
      :md="4"
    >
      <base-card
        :height="value.prominent ? 370 : 320"
        @click="$Common.goLeafRoute(value.author, value.title)"
      >
        <v-img
          :src="require(`@/assets/articles/${value.thumbnail}`)"
          height="50%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >
        </v-img>
          <v-row
            v-if="!value.prominent"
            class="fill-height text-right ma-0"
          >
            <v-col cols="12">
              <span class="text-h6 title font-weight-bold mb-2">
                {{ value.title }}
              </span>

              <div class="caption">
                <v-avatar
                  size="32"
                  class="ma-2">
                    <img
                      :src="require(`@/assets/articles/${value.thumbnail}`)"
                      alt="avatar"
                    >
                  </v-avatar>
                  <span class="text-subtitle-3 font-weight-bold">{{ value.author }}</span>
                  <br/>
                <span class="text-body-4">조회수 3.5만 | {{ $Time.dateToFormatForToday(value.date) }}</span>
                  <v-icon class="ma-0" color="blue darken-2">mdi-water-outline</v-icon>
                  <span class="text-body-6" v-text="value.water.toString()"></span>
              </div>
            </v-col>
          </v-row>

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
