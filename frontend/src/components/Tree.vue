<template>
  <v-container>
    <v-layout column class="mt-16 ma-4">
      <v-col class="align-center">
        <v-row class="ml-8">
          <v-row>
            <v-avatar color="orange" size="128">
            <span class="white--text headline">아이</span>
          </v-avatar>
          <v-col>
            <v-text class="ma-1 font-weight-bold" style="font-size:1.5rem">아이디</v-text>
            <br />
            <v-text class="ma-1" style="font-size:0.8rem">구독자 3명</v-text>
            <br />
            <v-text singleline class="ma-1" style="font-size:1.1rem">당신의 나무를 설명해주세요</v-text>
          </v-col>
          </v-row>
          <v-row class="align-end mr-8">
            <v-col class="d-flex flex-row-reverse">
              <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ma-4" large color="blue darken-2" v-bind="attrs"
            v-on="on" @click="console.log('dd')">mdi-water-outline</v-icon>
              </template>
              <span>물주기</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ma-4" large color="blue-grey darken-2" v-bind="attrs"
            v-on="on" @click="console.log('dd')">mdi-bell-outline</v-icon>
              </template>
              <span>구독하기</span>
            </v-tooltip>
            </v-col>
            </v-row>
        </v-row>
      </v-col>
      <v-col>
        <v-divider></v-divider>
      </v-col>
      <v-col class="mt-16">
          <v-tabs
            background-color="white"
            centered
            color="#827717"
          >
            <v-tab class="pr-16 pl-16" style="font-size:1.3rem">
              <v-img src="../assets/logo/leaflog_symbol.png" height=26 width=26 contain></v-img></v-tab>
            <v-tab class="pr-16 pl-16" style="font-size:1.3rem">소개</v-tab>
      
            <v-tab-item class="mt-8">
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="i in 6"
                    :key="i"
                    cols="12"
                    md="4"
                  >
                    <v-img
                      :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`"
                      :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
                      aspect-ratio="1"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container fluid>
                <v-col class="text-center" cols="12">
                  <v-img src="../assets/vector/tree.png" aspect-ratio="1.7" max-height=300 contain></v-img>
                  <transition name="slide-y-reverse-transition" appear>
                    <h1 class="mt-8 display-1 font-weight-thin mb-4">당신의 나무를 소개해보세요</h1>
                  </transition>
                  <h4 class="subheading">{{this.currentPath}}</h4>
                </v-col>
              </v-container>
            </v-tab-item>
          </v-tabs>
      </v-col>
      <v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>