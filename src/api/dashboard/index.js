
import request from '@/api/request'
function getdashboard(data) {
    return request({
        url: '/admin/xy/dashboard/base',
        method: 'get',
        data
    })
}

export default {
    getdashboard
}

