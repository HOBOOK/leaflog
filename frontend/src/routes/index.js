import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';
import Tree from '../components/Tree.vue';
import Footprint from '../components/Footprint.vue';
import Leaf from '../components/Leaf.vue';
import LeafEditor from '../components/LeafEditor.vue';
import Search from '../components/Search.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Main,
            meta: {
                auth: true,
                title: '숲'
            }
        },
        {
            path: '/tree/:id/',
            component: Tree,
            meta: {
                auth: true,
                title: '나의 나무'
            }
        },
        {
            path: '/tree/:id/:key',
            component: Leaf,
            meta: {
                auth: true,
                title: ''
            }
        },
        {
            path: '/footprint/:id',
            component: Footprint,
            meta: {
                auth: true,
                title: '발자취'
            }
        },
        {
            path: '/edit',
            component: LeafEditor,
            meta: {
                auth: true,
                title: '새로운 글'
            }
        },
        {
            path: '/search/:keyword',
            component: Search,
            meta: {
                auth: true,
                title: '검색'
            }
        }
    ]
})

export default router
