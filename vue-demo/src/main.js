// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import footer from './common/footer.vue';

Vue.config.devtools = true;
Vue.config.debug = true
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('qf-footer', footer);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})