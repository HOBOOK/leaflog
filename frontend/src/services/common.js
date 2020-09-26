import router from "../routes/index.js"

export default class Common {
    goRoute(route){
        if (router.app.$route.path !== route)
            router.app.$router.push(route);
    }
    getCurrentRoutePath() {
        return router.app.$router.currentRoute.path;
    }
    getCurrentRouteArticleInfo() {
        const root = router.app.$router.currentRoute.path;
        const query = {
            title: root.substring(root.lastIndexOf('/')+1),
            author: root.substring(root.indexOf('@')+1, root.lastIndexOf('/'))
        }
        return JSON.stringify(query)
    }
}