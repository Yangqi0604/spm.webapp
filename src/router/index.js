import Vue from 'vue'
import Router from 'vue-router'


import mainRouter from './main.router'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    ...mainRouter
  ]
})


export default router
