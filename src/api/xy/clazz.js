import request from '@/api/request'
function classList(data) {
    return request({
        url: '/admin/xy/clazz/list',
        method: 'get',
        data
    })
}

function classSave(data) {
    return request({
        url: '/admin/xy/clazz/save',
        method: 'post',
        data
    })
}

function classUpdate(data) {
    return request({
        url: '/admin/xy/clazz/update',
        method: 'post',
        data
    })
}

function classDetail(data) {
    return request({
        url: '/admin/xy/clazz/detail',
        method: 'get',
        data
    })
}

function classDel(data) {
    return request({
        url: '/admin/xy/clazz/del',
        method: 'get',
        data
    })
}

export default {
    classList,
    classSave,
    classUpdate,
    classDetail,
    classDel
}