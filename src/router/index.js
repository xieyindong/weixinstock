import Vue from 'vue'
import Router from 'vue-router'
import stockDaily from '../views/stockDaily.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/stockDaily',
      name: 'stockDaily',
      component: stockDaily
    }
  ]
})
