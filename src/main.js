import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import highlight from 'highlight.js';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(highlight);


//封装成一个指令
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    highlight.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
