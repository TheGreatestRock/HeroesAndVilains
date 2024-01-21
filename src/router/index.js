import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        // component: HomeView
    },
    {
        path: '/authentication',
        name: 'authentication',
        children: []
    },
    {
        path: '/organisations',
        name: 'organisations',
        children: [
            {
                path: '/organisations/:name',
                name: 'organisation',
            }
        ]
    },
    {
        path: '/teams',
        name: 'teams',
        children: [
            {
                path: '/teams/:name',
                name: 'team',
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
