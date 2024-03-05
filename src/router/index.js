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
        component : () => import('../views/AuthenticationView.vue'),
        children: []
    },
    {
        path: '/organisations',
        name: 'organisations',
        component: () => import('../views/OrganisationsView.vue'),
        children: [
            {
                path: '/organisations/',
                name: 'organisationsList',
                components: {
                    organisationMain: () => import('../components/OrganisationsList.vue')
                }
            },
            {
                path: '/organisations/current',
                name: 'currentOrganisationDetails',
                components: {
                    organisationMain: () => import('../components/OrganisationDetails.vue')
                }
            }
        ]
    },
    {
        path: '/teams',
        name: 'teams',
        component: () => import('../views/TeamsView.vue'),
        children: [
            {
                path: '/teams/',
                name: 'teamsList',
                components: {
                    teamMain: () => import('../components/TeamsList.vue')
                }
            },
            {
                path: '/teams/current',
                name: 'currentTeamDetails',
                components: {
                    teamMain: () => import('../components/TeamDetails.vue')
                }
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
