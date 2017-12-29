import Vue from 'vue';
import Router from 'vue-router';
import { Lazyload, Cell, CellGroup } from 'vant';
import vantCss from 'vant-css';
Vue.use(Router);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(vantCss);

const User = r => require.ensure([], () => r(require('./view/user')), 'user');
const Cart = r => require.ensure([], () => r(require('./view/cart')), 'cart');
const Goods = r => require.ensure([], () => r(require('./view/goods')), 'goods');
// const App = r => require.ensure([], () => r(require('./App')), 'App');
const Home = r => require.ensure([], () => r(require('./view/home')), 'home');
const Search = r => require.ensure([], () => r(require('./view/search_goods')), 'search');
const OrderList = r => require.ensure([], () => r(require('./view/order_list')), 'orderList');
const Classify = r => require.ensure([], () => r(require('./view/classify')), 'classify');
const OrderDetail = r => require.ensure([], () => r(require('./view/order')), 'orderDetail');

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
    name: 'classify',
    component: Classify,
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
    component: OrderList,
    meta: {
      title: '订单列表'
    }
  },
  {
    name: 'orderDetail',
    component: OrderDetail,
    meta: {
      title: '订单详情'
    },
    params: {
      orderId: 0
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
