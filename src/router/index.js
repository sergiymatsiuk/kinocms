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
    component: () => import('../views/Cinemas.vue')
  },
  {
    path: '/films',
    name: 'Films',
    component: () => import('../views/Films.vue')
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
    path: '/pages',
    name: 'Pages',
    component: () => import('../views/Pages.vue')
  },
  {
    path: '/shares',
    name: 'Sharess',
    component: () => import('../views/Shares.vue')
  },
  {
    path: '/',
    name: 'Statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/films/films-pages',
    name: 'FilmsPage',
    component: () => import('../views/FilmsPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
