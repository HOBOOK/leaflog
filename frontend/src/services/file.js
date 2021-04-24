export default class Storage {
    getAvatar (key) {
        if(typeof key === 'undefined' || key.length === 0){
            return '/default-avatar.png'
        }
        return window.axios.defaults.baseURL + `/s3/download/` + key
    }
    getImage (key) {
        if(typeof key === 'undefined' || key.length === 0){
            return '/default-image.png'
        }
        return window.axios.defaults.baseURL + `/s3/download/` + key
    }
}