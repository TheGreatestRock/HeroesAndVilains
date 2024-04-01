import Vue from 'vue';
import VueRouter from 'vue-router';
//import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: false },
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import('../views/AuthenticationView.vue'),
    children: [],
    meta: { requiresAuth: false },
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
          organisationMain: () => import('../components/OrganisationsList.vue'),
        },
        meta: { requiresAuth: false },
      },
      {
        path: '/organisations/current',
        name: 'currentOrganisationDetails',
        components: {
          organisationMain: () => import('../components/OrganisationDetails.vue'),
        },
        meta: { requiresAuth: true },
      },
    ],
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
          teamMain: () => import('../components/TeamsList.vue'),
        },
        meta: { requiresAuth: true },
      },
      {
        path: '/teams/current',
        name: 'currentTeamDetails',
        components: {
          teamMain: () => import('../components/TeamDetails.vue'),
        },
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
  },
  {
    path: '*',
    redirect: '/',
  },
  
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});




export default router;
