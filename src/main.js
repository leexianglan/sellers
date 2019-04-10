// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'

import './common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

/* eslint-disable no-new */

// let app = Vue.extend(App)
// const router = new VueRouter({
//   routers
// })
const routers = [
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings }
]
// // 加一个挂载点
// routers.start(app, '#app')
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })
const router = new VueRouter({
  routes: routers,
  linkActiveClass: 'active'
})
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.push('/goods')
console.log(app)
