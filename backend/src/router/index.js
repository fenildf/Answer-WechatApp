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
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            children: [{
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: {title: '后台首页', icon: 'el-icon-setting'}
            }]
        },
        {
            path: '/user',
            component: Layout,
            redirect: '/user/index',
            children: [
                {
                    path: 'index',
                    name: 'user',
                    component: () => import('@/views/user/index'),
                    meta: {title: '用户管理', icon: 'el-icon-rank'}
                }
            ]
        },
        {
            path: '/menu',
            component: Layout,
            redirect: '/menu/index',
            children: [
                {
                    path: 'index',
                    name: 'menu',
                    component: () => import('@/views/menu/index'),
                    meta: {title: '套题管理', icon: 'el-icon-rank'}
                }
            ]
        },
        {
            path: '/question',
            component:Layout,
            redirect:'/question/index',
            children:[
                {
                    path:'index',
                    name:'question',
                    component:()=> import('@/views/question/index'),
                    meta:{title:'题目管理',icon:'el-icon-rank'}
                }
            ]
        }
    ]
})
