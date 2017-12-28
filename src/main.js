import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
