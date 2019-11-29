import request from '@/api/request'
function costList(data) {
    return request({
        url: '/admin/xy/cost/list',
        method: 'get',
        data
    })
}

export default {
    costList
}