<template>
  <div>
    <template v-for="goods in goods_list">
      <van-card
        :title="goods.title"
        :desc="goods.desc"
        :num="goods.num"
        :price="goods.num"
        :thumb="goods.imageURL"
      />
    </template>

  </div>

</template>
<script>
  import { Card } from 'vant';
  import api from '../../axios/api.js';
  export default {
    components: {
      [Card.name]: Card
    },
    created() {
      api.http('/get/homePageVal')
        .then(res => {
            this.goods_list = res.result;
        });
    },
    data() {
      return {
        goods_list: []
      };
    }
  };
</script>
<style type="less">
  .goods_list{

  }
</style>

