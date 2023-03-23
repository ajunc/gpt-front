import http from '@/utils/request'

export function signUp (params) {
    return http.post({
        url: '/api/sign_up',
        method: 'post',
        data: params
    })
}
