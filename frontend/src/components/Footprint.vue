<template>
  <v-app id="inspire">
    <v-container style="display:flex;">
    <template v-for="x in 52">
        <v-col style="max-width:30px; display:inline-block; padding:0" no-gutters v-show="x === 1" :key="x">
            <template no-gutters v-for="n in 7">
            <v-row no-gutters v-if="n===1" :key="n" style="font-size:12px">
                mon
            </v-row>
            <v-row no-gutters v-else-if="n===4" :key="n" style="font-size:12px">
                thu
            </v-row>
            <v-row no-gutters v-else-if="n===7" :key="n" style="font-size:12px">
                sun
            </v-row>
            <v-row no-gutters v-else :key="n" style="font-size:12px">
                .
            </v-row>
            </template>
        </v-col>
        <v-col style="max-width:20px; display:inline-block; padding:0" no-gutters :key="x">
          <template no-gutters v-for="y in 7">
          <v-row no-gutters :key="y">
            <v-card
              class="pa-2"
              outlined
              tile
            >
            </v-card>
          </v-row>
          
        </template>
      </v-col>
    </template>
      
    </v-container>
  </v-app>
    
</template>