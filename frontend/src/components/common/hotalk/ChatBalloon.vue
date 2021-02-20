<template>
    <div v-if="message.type === 'CHAT'">
        <v-card v-if="message.self"
            flat
            fluid 
            class="d-flex justify-end">
            <v-container class="pb-0 pt-0">
                <v-row
                    class="d-flex justify-end"
                    align="end"
                    v-if="!message.isBind"
                >
                    <span class="text-caption text-time">{{receiveTime}}</span>
                </v-row>
                <v-row
                    class="d-flex justify-end"
                >
                    <v-scale-transition>
                    <v-sheet
                        rounded="lg"
                        :color="color"
                        class="pa-2"
                        style="text-align:right;"
                        v-show="show"
                        max-width="300"
                    >
                        <span
                            style="color:white;"
                        >
                            {{message.content}}
                        </span>
                    </v-sheet>
                    </v-scale-transition>
                </v-row>
            </v-container>
        </v-card>
        <v-card v-else
            flat
            fluid
        >
            <v-container
                class="pb-0 pt-0"
            >
                <v-row align="end"
                    v-if="!message.isBind"
                >
                    <v-avatar
                        color="teal"
                        size="24"
                        class="mr-2"
                    >
                        <span class="white--text font-weight-bold">{{message.sender.substring(0,1)}}</span>
                    </v-avatar>
                    <span>
                        {{message.sender}}
                    </span>
                    <span class="text-caption text-time ml-2">{{receiveTime}}</span>
                </v-row>
                <v-row
                    class="d-flex ml-4"
                >
                    <v-scale-transition>
                    <v-sheet
                        rounded="lg"
                        color="teal accent-2"
                        class="pa-2"
                        v-show="show"
                        max-width="300"
                    >
                        {{message.content}}
                    </v-sheet>
                    </v-scale-transition>
                </v-row>
            </v-container>
        </v-card>
    </div>
    <div v-else-if="message.type === 'JOIN'">
        <v-card flat fluid class="d-flex justify-center align-center">
            {{message.sender}}님이 입장하였습니다.
        </v-card>
    </div>
    <div v-else-if="message.type === 'LEAVE'">
        <v-card flat fluid class="d-flex justify-center align-center">
            {{message.sender}}님이 채팅방을 떠났습니다.
        </v-card>
    </div>
    <div v-else-if="message.type === 'ERROR'">
        <v-card flat fluid class="d-flex justify-center align-center">
            {{message.content}}
        </v-card>
    </div>
</template>
<script>
export default {
    name: 'Chat',
    props: {
        message: {
            type: Object,
        },
        color: {
            type: String
        }
    },
    data:() => ({
        show: false
    }),
    mounted() {
        this.show = true
    },
    computed: {
        receiveTime() {
            try{
                const time = new Date(this.message.createDate)
                const hour = time.getHours()
                const minute = time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes()
                if(hour > 12) {
                    return '오후 ' + (hour-12) + ':' + minute
                } else {
                    return '오전 ' + hour + ':' + minute
                }
            }catch{
                return '오전 0:00'
            }
            
        }
    }
}
</script>
<style scoped>
    .text-time{
        color:rgba(0,0,0,0.36)
    }
</style>