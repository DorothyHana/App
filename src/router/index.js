import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/login.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/home.vue')
      },
      {
        path: 'meals',
        component: () => import('../views/meals.vue')
      },
      {
        path: 'point',
        component: () => import('../views/point.vue')
      },
      {
        path: 'remain',
        component: () => import('../views/remain.vue')
      },
      {
        path: 'schedule',
        component: () => import('../views/schedule.vue')
      },
      {
        path: 'washer',
        component: () => import('../views/washer.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
