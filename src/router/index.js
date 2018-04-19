import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Guest from './guest'
import index from '../components/index'
import dashboard from '../components/dashboard'
import present from '../components/actions/present'
import holiday from '../components/actions/holiday'
import trip from '../components/actions/trip'
import rest from '../components/actions/rest'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            beforeEnter: Guest
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: dashboard,
            beforeEnter: AuthGuard
        },
        {
            path: '/actions/present',
            name: 'present',
            component: present,
            beforeEnter: AuthGuard
        },
        {
            path: '/actions/holiday',
            name: 'holiday',
            component: holiday,
            beforeEnter: AuthGuard
        },
        {
            path: '/actions/trip',
            name: 'trip',
            component: trip,
            beforeEnter: AuthGuard
        },
        {
            path: '/actions/rest',
            name: 'rest',
            component: rest,
            beforeEnter: AuthGuard
        }
    ],
    mode: 'history'
})
