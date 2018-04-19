import { store } from '../store/index'

export default (to, from, next) => {
    let token = localStorage.getItem('office_token')

    if (token !== null && token !== 'undefined') {
        store.dispatch('autoSignIn', token)
        //next('/dashboard')
    } else {
        next()
    }
}