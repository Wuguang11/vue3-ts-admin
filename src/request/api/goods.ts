import service from '../index'

export function getGoodsList() {
    return service({
        url: '/getGoodsList',
        method: 'GET',
    })
}