import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/admin/banner',
    name: 'Banner',
    meta: { layout: 'admin' },
    component: () => import('../views/Banner.vue')
  },
  {
    path: '/admin/cinemas',
    name: 'Cinemas',
    meta: { layout: 'admin' },
    component: () => import('../views/cinemas/Cinemas.vue')
  },
  {
    path: '/admin/cinemas-page/:id',
    name: 'CinemasPage',
    meta: { layout: 'admin' },
    component: () => import('../views/cinemas/CinemasPage.vue')
  },
  {
    path: '/admin/cinemas-hall/:id',
    name: 'CinemasHall',
    meta: { layout: 'admin' },
    component: () => import('../views/cinemas/CinemasHall.vue')
  },
  {
    path: '/admin/films',
    name: 'Films',
    meta: { layout: 'admin' },
    component: () => import('../views/Films.vue')
  },
  {
    path: '/admin/films-pages/:id',
    name: 'FilmsPage',
    meta: { layout: 'admin' },
    component: () => import('../views/FilmsPage.vue')
  },
  {
    path: '/admin/mailing/select-mailing',
    name: 'Mailing',
    meta: { layout: 'admin' },
    component: () => import('../views/mailing/Mailing.vue')
  },
  {
    path: '/admin/mailing/select-user',
    name: 'SelectUser',
    props: true,
    meta: { layout: 'admin' },
    component: () => import('../views/mailing/UserFromMailing.vue')
  },
  {
    path: '/admin/news',
    name: 'News',
    meta: { layout: 'admin' },
    component: () => import('../views/News.vue')
  },
  {
    path: '/admin/news-pages/:id',
    name: 'NewsPages',
    meta: { layout: 'admin' },
    component: () => import('../views/NewsPages.vue')
  },
  {
    path: '/admin/pages',
    name: 'Pages',
    meta: { layout: 'admin' },
    component: () => import('../views/pages/Pages.vue')
  },
  {
    path: '/admin/create-pages/:id',
    name: 'CreatePages',
    meta: { layout: 'admin' },
    component: () => import('../views/pages/CreatePages.vue')
  },
  {
    path: '/admin/create-main-page/:id',
    name: 'CreateMainPage',
    meta: { layout: 'admin' },
    component: () => import('../views/pages/CreateMainPage.vue')
  },
  {
    path: '/admin/create-contact-page/:id',
    name: 'CreateContactPage',
    meta: { layout: 'admin' },
    component: () => import('../views/pages/CreateContactPage.vue')
  },
  {
    path: '/admin/action',
    name: 'Action',
    meta: { layout: 'admin' },
    component: () => import('../views/Action.vue')
  },
  {
    path: '/admin/action-pages/:id',
    name: 'ActionPages',
    meta: { layout: 'admin' },
    component: () => import('../views/ActionPages.vue')
  },
  {
    path: '/',
    name: 'Statistics',
    meta: { layout: 'admin' },
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/admin/create-users/:id',
    name: 'CreateUsers',
    meta: { layout: 'admin' },
    component: () => import('../views/users/CreateUsers.vue')
  },
  {
    path: '/admin/users',
    name: 'Users',
    meta: { layout: 'admin' },
    component: () => import('../views/users/Users.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
