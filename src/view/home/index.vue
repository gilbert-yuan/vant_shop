<template>
  <div id="home" >
    <van-swipe :autoplay="4000" class="top_van_swipe">
      <van-swipe-item v-for="image in images">
        <img v-lazy="image.image" class="home_van_swipe_image" />
      </van-swipe-item>
    </van-swipe>
    <div>
      <van-row  v-for="catRow in hotCat" class="row_col_span">
        <template v-for="row in catRow">
          <div @click="onClickCatRow(row)">
            <van-col span="6" class="row_col_img" >
              <van-row >
                <img v-lazy="row.image" class="home_van_cat_image" />
              </van-row>
              <span>{{row.name}}</span>
            </van-col>
          </div>
        </template>
      </van-row>
    </div>
    <product-swipe :competitiveProducts="competitiveProducts.product"
                   :productList="productList"
                   :productNum="productNum" :title="competitiveProducts.name"/>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, Lazyload, Row, Col, Cell } from 'vant';
  import ProductSwipe from '../product_swipe/index.vue';
  import api from '../../axios/api.js';
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
      api.http('/get/homePageVal')
        .then(res => {
          var allResult = res.result;
          this.hotCat = allResult.hotCat;
          this.images = allResult.images;
          this.competitiveProducts = allResult.competitiveProducts;
          for (var i = 0; i < Math.floor(this.competitiveProducts.product.length / this.productNum); i++) {
            this.productList.push(i);
          }
        });
    },
    methods: {
      onClickCatRow(catRow) {
        console.log(catRow);
        this.$router.push({ name: 'goodsList' });
      }
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
        hotCat: [],
        productList: [],
        images: [],
        competitiveProducts: [],
        productNum: 3
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
  .home_van_cat_image {
    font-size: 16px;
    height: 50px;
    width:  50px;
    border-radius:50%;
    }
  .row_col_span{
    font-size: 8px;
  }
  .row_col_img {
    text-align:center;
  }
</style>
