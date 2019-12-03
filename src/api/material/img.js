import request from '@/api/request'
function imgList(data) {
    return request({
        url: '/admin/xy/upload/list',
        method: 'post',
        data
    })
}
function imgDel(data) {
    return request({
        url: '/admin/xy/upload/del',
        method: 'get',
        data
    })
}
function updateTitle(data) {
    return request({
        url: '/admin/xy/upload/updateTitle',
        method: 'post',
        data
    })
}



export default {
    imgList,
    imgDel,
    updateTitle
}