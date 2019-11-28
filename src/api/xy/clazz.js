import request from '@/api/request'
function classList(data) {
    return request({
        url: '/admin/xy/clazz/list',
        method: 'get',
        data
    })
}

export default {
    classList
}