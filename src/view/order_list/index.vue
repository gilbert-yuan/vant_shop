<template>
  <div>
    <van-tabs :active="active">
      <van-tab v-for="index in 4" :title="'选项 ' + index">
        <template v-for="order in orders">
            <van-panel title="标题" desc="描述信息" status="状态">
              <goods-lines></goods-lines>
            </van-panel>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { Card, Panel, Tab, Tabs } from 'vant';
  import GoodsLine from '../goods_line/index.vue';
  export default {
    name: 'order-line',
    props: {
      lineIds: Number
    },
    components: {
      [Card.name]: Card,
      [GoodsLine.name]: GoodsLine,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Panel.name]: Panel
    },
    data() {
      return {
        active: 0,
        orders: [1, 2, 3, 4, 5]
      };
    }
  };

</script>
<style>

</style>
