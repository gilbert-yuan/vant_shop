import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import Vuex from 'vuex';

require('./mock.js');
Vue.use(Vuex);

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});
const store = new Vuex.Store({}); // 这里你可能已经有其他 module
store.registerModule('vantStore', {
  state: {
    bottomActive: true,
    headTitle: '首页',
    goodsCart: []
  },
  mutations: {
    updatebottomActive: function(state, payload) {
      state.bottomActive = payload;
    },
    updateheadTitle: function(state, payload) {
      state.headTitle = payload;
    }
  }
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
