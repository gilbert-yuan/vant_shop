import Vue from 'vue';
import Router from 'vue-router';
import { Lazyload, Cell, CellGroup } from 'vant';
Vue.use(Router);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);

const User = r => require.ensure([], () => r(require('./view/user')), 'user');
const Cart = r => require.ensure([], () => r(require('./view/cart')), 'cart');
const Goods = r => require.ensure([], () => r(require('./view/goods')), 'goods');
// const App = r => require.ensure([], () => r(require('./App')), 'App');
const Home = r => require.ensure([], () => r(require('./view/home')), 'home');
const Search = r => require.ensure([], () => r(require('./view/search_goods')), 'search');
const Orders = r => require.ensure([], () => r(require('./view/order_list')), 'orders');
const routes = [
  {
    path: '*',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    name: 'user',
    component: User,
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'search',
    component: Search,
    meta: {
      title: '搜索'
    }
  },
  {
    name: 'cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: Goods,
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'orders',
    component: Orders,
    meta: {
      title: '订单列表'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
