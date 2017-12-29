<template>
  <div>
    <van-row><h4>{{title}}</h4></van-row>
    <van-swipe :autoplay="3000" class="goods_van_swipe">
      <van-swipe-item v-for="frequencyIndex in productList">
        <van-row>
          <template v-for="product in competitiveProducts.slice(frequencyIndex * productNum, frequencyIndex * productNum + productNum)">
            <div @click="onclickProduct(product)" class="cell_product">
              <van-col span="8" >
                <van-row><img v-lazy="product.image"/></van-row>
                <van-row>
                  <van-cell :value="product.name" />
                </van-row>
                <van-row>
                  <van-cell :value="product.price"/>
                </van-row>
              </van-col>
            </div>
          </template>
        </van-row>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, Lazyload, Row, Col, Cell } from 'vant';
  export default {
    name: 'product-swipe',
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Row.name]: Row,
      [Cell.name]: Cell,
      [Col.name]: Col,
      [Lazyload.name]: Lazyload
    },
    props: {
      competitiveProducts: Array,
      productNum: Number,
      title: String,
      productList: Array
    },
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
      onclickProduct(product) {
        this.$router.push({ name: 'goods', params: { goodsId: product.id }});
      }
    }
  };

</script>
<style>
  .cell_product{
    text-align:center;
    display:inline;
  }

</style>
