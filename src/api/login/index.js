
import request from '@/api/request'
function doLogin(data) {
    return request({
        url: '/admin/login/doLogin',
        method: 'post',
        data
    })
}
function getUserInfo(data) {
    return request({
        url: '/admin/login/getUserInfo',
        method: 'get',
        data
    })
}

function doLogOut(data) {
    return request({
        url: '/admin/login/doLogOut',
        method: 'get',
        data
    })
}
export default {
    doLogin,
    getUserInfo,
    doLogOut
}

