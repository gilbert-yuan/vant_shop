<template>
  <div id="app">
    <van-nav-bar
      :title="headTitle"
      left-text="返回"
      left-arrow
      @clickLeft="onClickLeft"
      @clickRight="onClickRight"
      :fixed="false"
      class="header_style"
    >
      <van-icon name="search"  slot="right" to="search"/>
    </van-nav-bar>
    <router-view/>
    <van-tabbar v-model="active" v-if="bottomActive">
      <van-tabbar-item icon="wap-home" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="chat" to="classify">分类</van-tabbar-item>
      <van-tabbar-item icon="logistics" to="Cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="User">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, NavBar, Icon, Popup } from 'vant';
  import { mapState } from 'vuex';
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
        show: false,
        active: 0,
        searchValue: ''
      };
    },
    created() {
      this.vantStore.headTitle = '首页';
    },
    methods: {
      onClickLeft() {
        console.log(this.$router);
        this.$router ? this.$router.back() : window.history.back();
      },
      onClickRight() {
        this.$router.push({ name: 'search' });
      }
    },
    computed: {
      ...mapState({
        bottomActive: state => state.vantStore.bottomActive,
        headTitle: state => state.vantStore.headTitle,
        vantStore: state => state.vantStore
      })
    }
  };

</script>

<style>
  body {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
  .header_style {
    z-index: 100;
  }
</style>
