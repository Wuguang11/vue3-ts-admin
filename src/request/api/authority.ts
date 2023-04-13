import service from '../index'

export function getAuthoristyList() {
    return service({
        url: '/getAuthorityList',
        method: 'GET',
    })
}