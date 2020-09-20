import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';
import Board from '../components/Board.vue';
import Footprint from '../components/Footprint.vue';
import Document from '../components/Document.vue';
import Search from '../components/Search.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main,
            meta: {
                auth: true,
                title: 'leaflog'
            }
        },
        {
            path: '/board/:id/',
            component: Board,
            meta: {
                auth: true,
                title: 'leaflog | board'
            }
        },
        {
            path: '/board/:id/:key',
            component: Document,
            meta: {
                auth: true,
                title: 'leaflog | :key'
            }
        },
        {
            path: '/footprint/:id',
            component: Footprint,
            meta: {
                auth: true,
                title: 'leaflog | 발자취'
            }
        },
        {
            path: '/search/:keyword',
            component: Search,
            meta: {
                auth: true,
                title: 'leaflog | 검색'
            }
        }
    ]
})

export default router
