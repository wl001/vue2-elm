
import Vue from 'vue';
import App from './App';
import router from './router'//路由
import VueResource from 'vue-resource'//交互
import './mock/mock'
import Star from './components/star' //自定义星星等级组件

Vue.use(VueResource);
Vue.use(Star);
Vue.filter('getYMD', function(input) {
  return input.split(' ')[0];
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
