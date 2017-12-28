<template>
  <div id="app">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @clickLeft="onClickLeft"
      @clickRight="onClickRight"
      :fixed="false"
    >
      <van-icon name="search"  slot="right" to="search"/>
    </van-nav-bar>
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" dot to="goods">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to="Cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="User">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, NavBar, Icon, Popup } from 'vant';
  import SearchGoods from './view/search_goods/index.vue';
  export default {
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [NavBar.name]: NavBar,
      [SearchGoods.name]: SearchGoods,
      [Popup.name]: Popup,
      [Icon.name]: Icon
    },
    data() {
      return {
        active: 0,
        show: false,
        searchValue: ''
      };
    },
    methods: {
      onClickLeft() {
        this.$router ? this.$router.back() : window.history.back();
      },
      onClickRight() {
        this.$router.push({ name: 'search' });
      }
    }
  };

</script>

<style>
  body {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
</style>
