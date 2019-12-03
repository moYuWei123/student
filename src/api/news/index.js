import request from '@/api/request'
function newsList(data) {
    return request({
        url: '/admin/xy/news/list',
        method: 'get',
        data
    })
}
function newsDel(data) {
    return request({
        url: '/admin/xy/news/del',
        method: 'get',
        data
    })
}
function newsdetail(data) {
    return request({
        url: '/admin/xy/news/detail',
        method: 'get',
        data
    })
}
function newsupdate(data) {
    return request({
        url: '/admin/xy/news/update',
        method: 'post',
        data
    })
}
function newssave(data) {
    return request({
        url: '/admin/xy/news/save',
        method: 'post',
        data
    })
}

export default {
    newsList,
    newsDel,
    newsdetail,
    newsupdate,
    newssave
}

