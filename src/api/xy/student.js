import request from '@/api/request'
function studentList(data) {
    return request({
        url: '/admin/xy/student/list',
        method: 'get',
        data
    })
}
function studentSave(data) {
    return request({
        url: '/admin/xy/student/save',
        method: 'post',
        data
    })
}
function studentUpdate(data) {
    return request({
        url: '/admin/xy/student/update',
        method: 'post',
        data
    })
}
function studentdetail(data) {
    return request({
        url: '/admin/xy/student/detail',
        method: 'get',
        data
    })
}
function del(data) {
    return request({
        url: '/admin/xy/student/del',
        method: 'get',
        data
    })
}

export default {
    studentList,
	studentSave,
	studentUpdate,
	studentdetail,
	del
}