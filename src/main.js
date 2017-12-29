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
    goodsCart: [{
      id: '1',
      title: '进口香蕉',
      desc: '约250g，2根',
      price: 200,
      num: 1,
      thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
    }, {
      id: '2',
      title: '陕西蜜梨',
      desc: '约600g',
      price: 690,
      num: 1,
      thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
    }, {
      id: '3',
      title: '美国伽力果',
      desc: '约680g/3个',
      price: 2680,
      num: 1,
      thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
    }]
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
