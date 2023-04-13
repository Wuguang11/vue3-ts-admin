import service from '../index'
import { LoginFormInt } from '@/type/login'

export function login(data:LoginFormInt) {
    return service({
        url: '/login',
        method: 'POST',
        data: data
    })
}