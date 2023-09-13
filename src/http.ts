import axios from 'axios';
axios.defaults.headers ["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"
// let instance = axios.create({timeout: 1000 * 12,baseURL:"http://124.70.8.57/"});
let instance = axios.create({timeout: 1000 * 12,baseURL:"http://paperist.mosymosy.cn/"});
instance.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("token")) {
            config.headers["Authorization"] = "JWT " + sessionStorage.getItem("token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    })
let es_axios = axios.create({
    timeout: 1000 * 12,
    //注释掉即可本地前端调试
    // baseURL:"http://124.70.8.57/",
    baseURL:"http://paperist.mosymosy.cn/",
    //baseURL:"https://123.249.72.97:9200/",
    headers: {
        'content-type': 'application/json',
    },
    auth: {
        username: 'elastic',
        password: 'BZYvLA-d*pS0EpI7utmJ'
    }
});
    instance.interceptors.request.use(
        config => {
            if (sessionStorage.getItem("token")) {
                config.headers["Authorization"] = "JWT " + sessionStorage.getItem("token")
            }
            return config
        },
        error => {
            return Promise.reject(error)
        })
export {instance,es_axios};