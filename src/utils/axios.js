import axios from 'axios'

axios.defaults.timeout = 30000

// HTTPrequest拦截
axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer '
    return config
}, error => {
    return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(res => {
        return Promise.resolve(res)
}, error => {
    NProgress.done()
    return Promise.reject(new Error(error))
})

export default axios
