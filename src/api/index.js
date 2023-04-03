import http from '@/utils/request'

export function signUp (params) {
    return http.post({
        url: '/api/sign_up',
        method: 'post',
        data: params
    })
}

export function administerPay (params) {
    return http.post({
        url: '/api/administer_pay',
        method: 'post',
        data: params
    })
}

export function login (params) {
    return http.post({
        url: '/api/login',
        method: 'post',
        data: params
    })
}

export function logout (params) {
    return http.post({
        url: '/api/logout',
        method: 'post',
        data: params
    })
}

export function getUserinfoApi (params) {
    return http.post({
        url: '/api/get_user_info',
        method: 'post',
        data: params
    })
}

export function queryLargeModel (params) {
    return http.post({
        url: '/api/query_large_model',
        method: 'post',
        data: params
    })
}

export function getChatList (params) {
    return http.post({
        url: '/api/get_conversation_history',
        method: 'get',
        data: params
    })
}
