import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '@/components/Login'
import Register from '@/components/register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            name: 'login',
            component: Login,
        }, {
            path: '/register',
            name: 'register',
            component: Register,
        }, {
            path: '/home',
            // name : 'home' ,
            component: Home,
            children: [
                {
                    path: '',
                    component: resolve => require(['../components/home/query.vue'], resolve)
                },
                {
                    path: '/home/query',
                    component: resolve => require(['../components/home/query.vue'], resolve)
                }, {
                    path: '/home/create',
                    component: resolve => require(['../components/home/createMeeting.vue'], resolve)
                },
            ],

        },

    ]
})
