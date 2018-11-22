import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

import '@/icons' // icon

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index'),
            hidden: true
        },
        {
            path:'/',
            component:Layout,
            redirect:'/dashboard',
            children:[{
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index')
            }]
        }
    ]
})
