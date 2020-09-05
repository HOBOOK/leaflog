import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';
import Board from '../components/Board.vue';
import Calendar from '../components/Calendar.vue';
import Footprint from '../components/Footprint.vue';
import Document from '../components/Document.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/board/:id/',
            component: Board
        },
        {
            path: '/board/:id/:key',
            component: Document
        },
        {
            path: '/calendar/:id',
            component: Calendar
        },
        {
            path: '/footprint/:id',
            component: Footprint
        }
    ]
})

export default router
