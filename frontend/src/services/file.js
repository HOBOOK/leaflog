export default class Storage {
    getAvatar (key) {
        if(typeof key === 'undefined' || key.length === 0){
            return '/default-avatar.png'
        }
        return window.axios.defaults.baseURL + `/s3/download/` + btoa(key)
    }
    getImage (key) {
        if(typeof key === 'undefined' || key.length === 0){
            return '/default-image.png'
        }
        return window.axios.defaults.baseURL + `/s3/download/` + btoa(key)
    }
    upload (key, data) {
        if(typeof key === 'undefined' || key.length === 0){
            return
        }
        const formData = new FormData();
        formData.set('name', key);
        formData.append('file', data);
        window.axios.post('/s3/upload', formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((e)=>{
            console.error(e)
        })
    }
}