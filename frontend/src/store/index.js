import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '#!',
      },
      {
        text: 'About',
        href: '#about',
      },
    ],
    token: localStorage.getItem("token"),
    loginDialogShow: false,
    isLogin: localStorage.getItem("token") !== null,
    socket: null,
    stompClient: null,
    parentComponent: null,
    alert: false,
    alertMessage: '',
    currentLeaf: {
      author:'',
      title:''
    }
  },
  getters: {
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          href: '#!',
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    setToken: function(state, token){
      state.token = token;
    },
    setAlert: function(state, message){
      state.alert = true;
      state.alertMessage = message;
    }
  },
  actions: {
    login: function(options, tokenData){
      options.commit('setToken', tokenData)
      localStorage.setItem("token",tokenData)
    },
    logout: function(options){
      options.commit('setToken', null)
      localStorage.removeItem("token")
      localStorage.removeItem("leaflog-storage")
    },
    updateToken: function(options, token){
      options.commit('setToken', token)
      localStorage.setItem("token", token)
    }
  },
})
