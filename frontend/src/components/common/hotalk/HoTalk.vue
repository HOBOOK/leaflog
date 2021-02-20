<template>
<div class="chat-container">
  <v-slide-y-reverse-transition>
    <v-card
      v-if="on" 
      width="360"
      height="480"
      class="chat-cover-card ma-0 pa-0"
      rounded="lg"
      elevation="0"
    >
      <v-app-bar
        dark
        :color="color"
        dense
        class="chat-app-bar"
      >
        <v-app-bar-nav-icon dense></v-app-bar-nav-icon>
  
        <v-toolbar-title
          class="font-weight-bold text-subtitle-2 pl-0"
        >
        TALK
        </v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon @click="onHideChat">mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-container class="ma-0 pa-0">
        <v-card
          height="380"
          class="ml-1 mr-1 pa-0"
          flat
          style="border-bottom:1px solid rgba(0,0,0,0.1); overflow-y:scroll"
          ref="messageContainer"
        >
          <v-row dense v-for="message in messages" :key="message.createDate">
            <v-col cols="12">
              <chat-balloon
                :message="message"
                :color="color"
              >
              </chat-balloon>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          height="40"
          class="ma-1 d-flex align-center"
          rounded="lg"
          flat
          style="background-color:transparent;"
        >
          <v-row class="d-flex align-center ma-0 pa-0">
            <v-col cols="2" class="ma-0 pa-0">
              <v-row class="ma-0 pa-0">
                <v-icon class="ml-1" color="grey lighten-1">
                  mdi-paperclip
                </v-icon>
                <v-icon class="ml-1" color="grey lighten-1">
                  mdi-emoticon-cool-outline
                </v-icon>
              </v-row>
            </v-col>
            <v-col cols="9" class="ma-0 pa-0">
              <v-text-field
              label="메세지를 입력해주세요"
              v-model="inputMessage"
              hide-details="true"
              solo
              dense
              flat
              v-on:keyup.enter="sendMessage"
              ></v-text-field>
            </v-col>
            <v-spacer/>
            <v-col cols="1" class="ma-0 pa-0">
              
              <v-icon class="ma-1 pr-1"
                @click="sendMessage"
                v-if="validateIsSendMessage()"
                color="primary"
              >
                mdi-send
              </v-icon>
              <v-icon class="ma-1 pr-1" color="grey lighten-1"
                v-else
              >
                mdi-send-outline
              </v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-card>
    <div v-else class="chat-button-cover">
      <v-btn
        class="mx-2"
        fab
        dark
        @click="onShowChat"
      >
        <v-badge
          color="primary"
          :content="unreadMessages"
          :value="unreadMessages"
          left
        >
          <v-icon>
            mdi-message-processing-outline
          </v-icon>
        </v-badge>
      </v-btn>
    </div>
  </v-slide-y-reverse-transition> 
</div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import ChatBalloon from './ChatBalloon.vue'

export default {
  name: 'Chat',
  data: () => ({
    on: false,
    me: '',
    randomNameList: ['짱구','철수','유리','맹구','훈이'],
    inputMessage: '',
    messages: [],
    cacheMessage: {},
    websocketTryCount: 0,
    color: 'primary',
    unreadMessages: 0
  }),
  components:{
    ChatBalloon
  },
  methods:{
    // 채팅서버 연결
    connectChat() {
      if(!this.on || this.$store.state.stompClient !== null) return
      this.$store.state.socket = new SockJS('http://ec2-15-164-102-153.ap-northeast-2.compute.amazonaws.com/ws')
      this.$store.state.stompClient = Stomp.over(this.$store.state.socket)
      this.$store.state.stompClient.debug = () => {}
      this.$store.state.stompClient.connect(
        {},
        () => {
          this.$store.state.stompClient.subscribe("/topic/dev.chat", this.onReceivedMessage);

          this.me = this.randomNameList[parseInt(Math.random() * this.randomNameList.length)]
          let message = {
            content:'입장',
            sender:this.me,
            type:'JOIN',
          }
          this.$store.state.stompClient.send("/app/chat.addUser/dev.chat", JSON.stringify(message), {})
        },
        error => {
          console.log('소켓연결 실패: ' + JSON.stringify(error))
          if(this.websocketTryCount < 3) {
            this.websocketTryCount++
            setTimeout(()=>{
              console.log('서버와 연결 재시도 : ' + this.websocketTryCount)
              this.connectChat()
            }, 3000)
          }else {
            let message = {}
            message.type = 'ERROR',
            message.content = '채팅서버 연결에 실패했습니다.',
            message.createDate = Date.now()
            this.messages.push(message)
          }
        }
      )
    },
    //서버로 메시지 전송
    sendMessage(){
      if(!this.validateIsSendMessage()) return
      let message = {
        sender: this.me,
        content: this.inputMessage,
        type: 'CHAT'
      }
      this.inputMessage = ''
      this.$store.state.stompClient.send("/app/chat.addUser/dev.chat", JSON.stringify(message), {})
    },

    //서버로부터 메시지 받음
    onReceivedMessage(res) {
      let message = JSON.parse(res.body)
      if(message.type === 'CHAT') {
        message.isBind = this.validateIsBind(message)
        message.self = this.me === message.sender
        if(!this.on && !message.self)
          this.unreadMessages++
      }
      
      this.messages.push(message)
      this.$nextTick(()=>{
        this.$refs.messageContainer.$el.scrollTop = this.$refs.messageContainer.$el.scrollHeight
      })
    },

    //1분이내에 같은 전송자가 메세지 보낼 경우 묶음
    validateIsBind(message) {
      if(this.cacheMessage !== null && typeof this.cacheMessage !== 'undefined' && !isNaN(Date.parse(this.cacheMessage.createDate))) {
        let diffMinute = (Date.parse(message.createDate) - Date.parse(this.cacheMessage.createDate))/ (1000 * 60)
        if(this.cacheMessage.sender === message.sender && diffMinute < 1) {
          return true
        }
      }
      this.cacheMessage = message
      return false
    },

    //채팅전송가능검증
    validateIsSendMessage() {
      if(this.$store.stompClient === null || this.inputMessage.length === 0)
        return false
      return true
    },

    onShowChat(){
      this.on = true
      this.connectChat()
      this.unreadMessages = 0
      this.$nextTick(()=>{
        this.$refs.messageContainer.$el.scrollTop = this.$refs.messageContainer.$el.scrollHeight
      })
    },

    onHideChat() {
      this.on = false
    }
  },
}

</script>

<style lang="scss">
  //채팅화면
  .chat-container{
    position:fixed; right: 10px; bottom: 10px;
    .chat-app-bar{
      height:48px !important;
      z-index: 10 !important;
      box-shadow: rgba(81, 99, 120, 0.3) 0px 5px 20px 0px !important;
    }
    .chat-cover-card{
      box-shadow: rgba(81, 99, 120, 0.3) 0px 6px 60px 0px !important;
    }

    .chat-button-cover{
      position:fixed; right: 10px; bottom: 10px;
    }
  }
  

</style>