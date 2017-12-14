import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'
Vue.use(Router);

const routes =  [
  {  path:'/goods', component:Goods},
  {  path:'/ratings', component:ratings},
  {  path:'/seller', component:seller},
  {  path:'*', component:Goods}
];
export default new Router({
  linkActiveClass: 'active',
  routes
})
