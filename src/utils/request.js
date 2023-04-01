import axios from 'axios'
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 50000 // 请求超时时间
})

// request拦截器  request  客户端向服务端发送端头
service.interceptors.request.use(
    config => {
        config.headers.Authorization = ''
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器   response   服务端向客户端发送端
service.interceptors.response.use(
    response => {
        /**
         * code为非1是抛错 可结合自己业务进行修改
         */
        return new Promise((resolve, reject) => {
            const res = response.data
            if(!res) {
                reject()
            }
            resolve(res)
        })
    },
    error => {
        return new Promise((resolve, reject) => {
            if(!error) {
                resolve()
            }
            Message.error({
                message: "网络请求失败请稍后再试~"
            });
            console.log('err' + error) 
            reject(error.response)
        })
    }
)

export default {
    // get请求
    get(obj) {
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url: obj.url,
                params: obj.data,
            }).then(res => {
                resolve(res)
                console.log(res)
            }).catch(err => {

                reject(err)

            })
        })
    },
    // post请求
    post(obj) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url: obj.url,
                data: obj.data,
            }).then(res => {
                resolve(res)
            }).catch(err => {

                reject(err)

            })
        })
    },
}
