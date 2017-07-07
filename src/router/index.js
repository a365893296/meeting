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
                {
                    path: '/home/exit',
                    component: resolve => require(['../components/home/exit.vue'], resolve),
                    // beforeEnter: (to, from, next) => {
                    //     alert(1)
                    // },

                    redirect: '/login',
                    // push:'/login'

                }
            ],
            beforeLeave:(to,from, next)=>{
                if(to = {path:'/login'}){
                    alert('beforeleave') ;
                }
            }
        },

    ]
})
