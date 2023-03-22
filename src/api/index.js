import request from '@/utils/request'

export function setForm (params) {
    return request({
        url: '/api/form/detials',
        method: 'post',
        data: params
    })
}
