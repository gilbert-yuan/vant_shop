<template>
  <div id="home" >
    <van-swipe :autoplay="4000" class="top_van_swipe">
      <van-swipe-item v-for="image in images">
        <img v-lazy="image" class="home_van_swipe_image" />
      </van-swipe-item>
    </van-swipe>
    <product-swipe :competitiveProducts="competitiveProducts" :productNum="productNum" :title="title"/>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, Lazyload, Row, Col, Cell } from 'vant';
  import ProductSwipe from '../product_swipe/index.vue';
  import { mapState } from 'vuex';

  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [ProductSwipe.name]: ProductSwipe,
      [Row.name]: Row,
      [Cell.name]: Cell,
      [Col.name]: Col,
      [Lazyload.name]: Lazyload
    },
    created() {
      this.vantStore.headTitle = '首页';
    },
    computed: {
      ...mapState({
        activce: state => state.vantStore.bottomActive,
        headTitle: state => state.vantStore.headTitle,
        vantStore: state => state.vantStore
      })
    },
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg'
        ],
        competitiveProducts: [
          { image: '//img11.360buyimg.com/n2/jfs/t3736/269/989477226/130123/24200e7b/58195eadN6e7e1dfc.jpg', name: '菲力西冷牛排套餐 1.5kg/袋 ', price: '10 积分', id: 1 },
          { image: '//img11.360buyimg.com/n4/s130x130_jfs/t2695/333/1670153493/259822/9b731c9/574675b2Naf5d0d71.jpg', name: '菲力西冷牛排套餐 1.5kg/袋 ', price: '10 积分', id: 1 },
          { image: '//img13.360buyimg.com/mobilecms/s110x110_jfs/t12499/178/1392083345/42073/dff5e7fa/5a1fab6aNce24512a.jpg', name: '菲力西冷牛排套餐 1.5kg/袋 ', price: '10 积分', id: 1 },
          { image: '//img14.360buyimg.com/mobilecms/s110x110_jfs/t7819/304/2196618385/110639/54e07059/59aa8a3eN367eeb85.jpg', name: '菲力西冷牛排套餐 1.5kg/袋 ', price: '10 积分', id: 1 },
          { image: '//img11.360buyimg.com/mobilecms/s110x110_jfs/t3124/82/6145010032/718525/4c915fa7/589ffcebN785dabf5.jpg', name: '菲力西冷牛排套餐 1.5kg/袋 ', price: '10 积分', id: 1 },
          { image: '//img12.360buyimg.com/mobilecms/s110x110_jfs/t3817/104/2365162945/96679/eab0ccf7/585a502bN93c4cd55.jpg', name: '纯棉空调毯懂你，一方天地的舒适清爽', price: '10 积分', id: 1 }
        ],
        productNum: 3,
        title: '精品推荐'
      };
    }
  };
</script>
<style>
  #home {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
  .top_van_swipe{
    height: 200px;
  }
  .home_van_swipe_image{
    height: 180px;
    width: 100%;
  }
  .goods_van_swipe{
    height: 200px;
    width: 100%;
  }
  .goods_van_swipe_image{
    height: 110px;
    width: 130px;
  }
</style>
