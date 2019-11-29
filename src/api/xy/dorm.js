import request from '@/api/request'
function dormList(data) {
    return request({
        url: '/admin/xy/dorm/list',
        method: 'get',
        data
    })
}

function dormSave(data) {
    return request({
        url: '/admin/xy/dorm/save',
        method: 'post',
        data
    })
}

function dormUpdate(data) {
    return request({
        url: '/admin/xy/dorm/update',
        method: 'post',
        data
    })
}

function dormDetail(data) {
    return request({
        url: '/admin/xy/dorm/detail',
        method: 'get',
        data
    })
}

function dormDel(data) {
    return request({
        url: '/admin/xy/dorm/del',
        method: 'get',
        data
    })
}

export default {
    dormList,
    dormSave,
    dormUpdate,
    dormDetail,
    dormDel
}