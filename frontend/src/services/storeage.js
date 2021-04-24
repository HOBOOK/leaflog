import Vue from 'vue'

export default class Storage {
    setUser (value, saveLocalStorage) {
        let all = this.getAll()
        all.saveLocalStorage = saveLocalStorage
        window.localStorage.setItem(this.localKey, JSON.stringify(all))
        this.setData('user', value)
    }
    clearUser () {
        window.localStorage.setItem(this.localKey, JSON.stringify({}))
        Vue.prototype.$session.clear()
    }

    getUser () {
        return this.getData('user')
    }

    getAll () {
        let all = {}
        try {
            all = JSON.parse(window.localStorage.getItem(this.localKey))
        } catch (e) {
            all = {}
        }
        return all || {}
    }

    setData (key, data) {
        let saveLocalStorage = false
        let all = this.getAll()
        if (typeof all.saveLocalStorage !== 'undefined') {
            if (all.saveLocalStorage === true) {
            saveLocalStorage = true
            }
        }
        if (saveLocalStorage === true) {
            all[key] = data
            window.localStorage.setItem(this.localKey, JSON.stringify(all))
        } else {
            Vue.prototype.$session.set(key, data)
        }
    }

    getData (key) {
        let loadLocalStorage = false
        let all = this.getAll()
        if (typeof all.saveLocalStorage !== 'undefined') {
            if (all.saveLocalStorage === true) {
            loadLocalStorage = true
            }
        }
        if (loadLocalStorage === true) {
            return all[key]
        } else {
            if(typeof Vue.prototype.$session === 'undefined') {
            return null
            }
            return Vue.prototype.$session.get(key)
        }
    }

    setSetting (section, ident, value) {
        const key = section + ident
        const all = this.getAll()
        all[key] = value
        window.localStorage.setItem(this.localKey, JSON.stringify(all))
    }

    getSetting (section, ident, value) {
        const key = section + ident
        const all = this.getAll()
        // eslint-disable-next-line no-prototype-builtins
        if (all.hasOwnProperty(key) === true) {
            return all[key]
        } else {
            return value
        }
    }
}