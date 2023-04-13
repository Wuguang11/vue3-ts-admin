import service from '../index'
// 用户列表接口
export function getUserList() {
    return service({
        url: '/getUserList',
        method: 'GET',
    })
}
// 获取角色列表接口
export function getRoleList() {
    return service({
        url: '/getRoleList',
        method: 'GET',
    })
}
