import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';
import Board from '../components/Board.vue';
import Calendar from '../components/Calendar.vue';
import Footprint from '../components/Footprint';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/board',
            component: Board
        },
        {
            path: '/calendar',
            component: Calendar
        },
        {
            path: '/footprint',
            component: Footprint
        }
    ]
})

export default router
