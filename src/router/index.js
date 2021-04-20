import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Gene from '../views/Gene.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/:id',
            name: 'Gene',
            component: Gene
        },
        {
            //prevent 404s 
            path: '/:catchAll(.*)',
            component: Home
        }
    ],
})

export default router