import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/banner',
    name: 'Banner',
    component: () => import('../views/Banner.vue')
  },
  {
    path: '/cinemas',
    name: 'Cinemas',
    component: () => import('../views/cinemas/Cinemas.vue')
  },
  {
    path: '/cinemas-page/:id',
    name: 'CinemasPage',
    component: () => import('../views/cinemas/CinemasPage.vue')
  },
  {
    path: '/cinemas-hall/:id',
    name: 'CinemasHall',
    component: () => import('../views/cinemas/CinemasHall.vue')
  },
  {
    path: '/films',
    name: 'Films',
    component: () => import('../views/Films.vue')
  },
  {
    path: '/films-pages/:id',
    name: 'FilmsPage',
    component: () => import('../views/FilmsPage.vue')
  },
  {
    path: '/mailing',
    name: 'Mailing',
    component: () => import('../views/Mailing.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },
  {
    path: '/news-pages/:id',
    name: 'NewsPages',
    component: () => import('../views/NewsPages.vue')
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('../views/pages/Pages.vue')
  },
  {
    path: '/create-pages/:id',
    name: 'CreatePages',
    component: () => import('../views/pages/CreatePages.vue')
  },
  {
    path: '/create-main-page/:id',
    name: 'CreateMainPage',
    component: () => import('../views/pages/CreateMainPage.vue')
  },
  {
    path: '/create-contact-page/:id',
    name: 'CreateContactPage',
    component: () => import('../views/pages/CreateContactPage.vue')
  },
  {
    path: '/action',
    name: 'Action',
    component: () => import('../views/Action.vue')
  },
  {
    path: '/action-pages/:id',
    name: 'ActionPages',
    component: () => import('../views/ActionPages.vue')
  },
  {
    path: '/',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/create-users/:id',
    name: 'CreateUsers',
    component: () => import('../views/users/CreateUsers.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/users/Users.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
