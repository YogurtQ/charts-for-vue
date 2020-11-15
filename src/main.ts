import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import Echart from '@/components/echart';
import Highchart from '@/components/highchart';

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.component('Echart', Echart);
Vue.component('Highchart', Highchart);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
