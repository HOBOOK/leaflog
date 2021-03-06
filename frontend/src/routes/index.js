import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';
import Tree from '../components/Tree.vue';
import Footprint from '../components/Footprint.vue';
import Leaf from '../components/Leaf.vue';
import LeafEditor from '../components/LeafEditor.vue';
import Search from '../components/Search.vue';
import store from '../store/index'
import Setting from '../components/settings/Setting.vue';

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
    try{
      JSON.parse(atob(localStorage.getItem("token").split('.')[1])).id
      return next();
    }
    catch{
        store.state.loginDialogShow = true
    }
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main,
            meta: {
                auth: true,
                title: '트렌드'
            }
        },
        {
            path: '/new',
            component: Main,
            meta: {
                auth: true,
                title: '새로운'
            }
        },
        {
            path: '/tree/:id/',
            component: Tree,
            meta: {
                auth: true,
                tree: true,
                title: 'tree'
            }
        },
        {
            path: '/tree/:id/:key',
            component: Leaf,
            meta: {
                auth: true,
                tree: true,
                title: 'leaf'
            }
        },
        {
            path: '/footprint/:id',
            component: Footprint,
            meta: {
                auth: true,
                title: '발자취'
            },
            beforeEnter: requireAuth()
        },
        {
            path: '/edit',
            component: LeafEditor,
            meta: {
                auth: true,
                title: '새로운 글'
            },
            beforeEnter: requireAuth()
        },
        {
            path: '/settings',
            component: Setting,
            meta: {
                auth: true,
                title: '설정'
            },
            beforeEnter: requireAuth()
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
