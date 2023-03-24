import http from '@/utils/request'

export function signUp (params) {
    return http.post({
        url: '/api/sign_up',
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
