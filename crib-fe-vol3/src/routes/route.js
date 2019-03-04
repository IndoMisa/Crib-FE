import Vue from 'vue'
import VueRouter from 'vue-router'
import Stanar from '../pages/Stanar.vue'
import Login from '../pages/Login.vue'
import Majstor from '../pages/Majstor.vue'
import Portir from '../pages/Portir.vue'
import Referent from '../pages/Referent.vue'
import {getCredentials, deleteCredentials} from '../services/authFetch'
import {clearFormMode, clearPageShown, clearUserInfo, getUserInfo} from "../services/contextManagement";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/stanar',
            name: 'Stanar',
            component: Stanar

        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/portir',
            name: 'Portir',
            component: Portir
        },
        {
            path: '/referent',
            name: 'Referent',
            component: Referent
        },
        {
            path: '/majstor',
            name: 'Majstor',
            component: Majstor
        }


    ]
})

router.beforeEach((to, from, next) => {
    if (getCredentials().accessToken == null && to.path != '/login')
        next("/login")
    else {
        let x = getUserInfo().userType
        if (x != null && to.path != ("/" + x))
            next("/" + x)
    }
    next()
})



export default router