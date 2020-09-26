import router from "../routes/index.js"

export default class Common {
    goRoute(route){
        if (router.app.$route.path !== route)
            router.app.$router.push(route);
    }
}