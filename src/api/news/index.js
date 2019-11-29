import request from '@/api/request'
function newsList(data) {
    return request({
        url: '/admin/xy/news/list',
        method: 'get',
        data
    })
}

export default {
    newsList
}

