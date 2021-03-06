import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
