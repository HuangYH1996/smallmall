import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload';

import toast from 'components/common/toast';

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

// 安装toast插件 本质上是去调用toast的install方法
Vue.use(toast);

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
