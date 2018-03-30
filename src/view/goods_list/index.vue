<template>
  <div class="goods_list">
    <ul
      v-waterfall-lower="loadMore"
      waterfall-disabled="disabled"
      waterfall-offset="400"
    >
      <template v-for="goods in goodsList">
        <div @click="viewGoodsDetail(goods)">
          <van-card
            :title="goods.name"
            :desc="goods.desc"
            :price="goods.price"
            :thumb="goods.image"
          />
        </div>
      </template>
    </ul>
  </div>
</template>
<script>
  import { Card, Row, Waterfall } from 'vant';
  import api from '../../axios/api.js';
  export default {
    components: {
      [Card.name]: Card,
      [Waterfall.name]: Waterfall,
      [Row.name]: Row
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    created() {
      api.http('/get/goodsList', { params: { domain: '', limit: 10, offset: 5 }})
        .then(res => {
          console.log(res.result);
          this.goodsList = res.result;
        });
    },
    data() {
      return {
        goodsList: []
      };
    },
    methods: {
      loadMore() {
        var self = this;
        this.disabled = true;
        api.http('/get/goodsList', { params: { domain: '', limit: 10, offset: 5 }})
          .then(res => {
            if (res.result) {
              res.result.forEach(function(value) {
                self.goodsList.push(value);
              });
            }
          });
        this.disabled = false;
      },
      viewGoodsDetail(goods) {
        this.$router.push({ name: 'goods', params: { goodsId: goods.id }});
      }
    }
  };
</script>
<style type="less">
  .goods_list{
    width:100%;
    height: 600px;
    overflow: scroll;
  }
</style>

