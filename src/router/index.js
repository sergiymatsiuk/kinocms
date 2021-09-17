import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: { layout: 'user' },
    component: () => import('../views/Main.vue')
  },
  {
    path: '/poster',
    name: 'Poster',
    meta: { layout: 'user' },
    component: () => import('../views/Poster.vue')
  },
  {
    path: '/soon-film',
    name: 'SoonFilm',
    meta: { layout: 'user' },
    component: () => import('../views/SoonFilm.vue')
  },
  {
    path: '/cinemas',
    name: 'Cinemas',
    meta: { layout: 'user' },
    component: () => import('../views/Cinemas.vue')
  },
  {
    path: '/cinema/:id',
    name: 'CinemaPage',
    meta: { layout: 'user' },
    component: () => import('../views/CinemaPage.vue')
  },
  {
    path: '/cinema/hall/:id',
    name: 'HallPage',
    meta: { layout: 'user' },
    component: () => import('../views/HallPage.vue')
  },
  {
    path: '/actions',
    name: 'Actions',
    meta: { layout: 'user' },
    component: () => import('../views/Actions.vue')
  },
  {
    path: '/action-page/:id',
    name: 'ActionPage',
    meta: { layout: 'user' },
    component: () => import('../views/ActionPage.vue')
  },
  {
    path: '/about-cinema',
    name: 'AboutCinema',
    meta: { layout: 'user' },
    component: () => import('../views/AboutCinema.vue')
  },
  {
    path: '/user-page',
    name: 'User-Page',
    meta: { layout: 'user' },
    component: () => import('../views/UserPage.vue')
  },
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
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        path: 'banner',
        name: 'Banner',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/banner/Banner.vue')
      },
      {
        path: 'cinemas',
        name: 'Cinemas',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/cinemas/Cinemas.vue')
      },
      {
        path: 'cinemas-page/:id',
        name: 'CinemasPage',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/cinemas/CinemasPage.vue')
      },
      {
        path: 'cinemas-hall/:id',
        name: 'CinemasHall',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/cinemas/CinemasHall.vue')
      },
      {
        path: 'films',
        name: 'Films',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/films/Films.vue')
      },
      {
        path: 'films-pages/:id',
        name: 'FilmsPage',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/films/FilmsPage.vue')
      },
      {
        path: 'mailing',
        name: 'Mailing',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/mailing/Mailing.vue')
      },
      {
        path: 'news',
        name: 'News',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/news/News.vue')
      },
      {
        path: 'news-pages/:id',
        name: 'NewsPages',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/news/NewsPages.vue')
      },
      {
        path: 'pages',
        name: 'Pages',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/pages/Pages.vue')
      },
      {
        path: 'create-pages/:id',
        name: 'CreatePages',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/pages/CreatePages.vue')
      },
      {
        path: 'create-main-page/:id',
        name: 'CreateMainPage',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/pages/CreateMainPage.vue')
      },
      {
        path: 'create-contact-page/:id',
        name: 'CreateContactPage',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/pages/CreateContactPage.vue')
      },
      {
        path: 'action',
        name: 'Action',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/action/Action.vue')
      },
      {
        path: 'action-pages/:id',
        name: 'ActionPages',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/action/ActionPages.vue')
      },
      {
        path: 'statistics',
        name: 'Statistics',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/statistics/Statistics.vue')
      },
      {
        path: 'create-users/:id',
        name: 'CreateUsers',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/users/CreateUsers.vue')
      },
      {
        path: 'users',
        name: 'Users',
        meta: { layout: 'admin' },
        component: () => import('../views/admin/users/Users.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
