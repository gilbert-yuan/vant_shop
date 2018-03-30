<template>
  <div>
    <van-tabs :active="active"  @click="onClicOrderType">
      <van-tab v-for="(type, index) in orderType" :title="type.name" :fixed="true" :key="index">
        <div class="div_scroll"
          v-waterfall-lower="loadMore"
          waterfall-disabled="true"
          waterfall-offset="300" >
            <div v-for="order in orders" @click="viewOrderDetial(order)">
              <van-panel :title="order.name" :status="order.state.title">
                <goods-lines :orderLines="order.orderLine"></goods-lines>
              </van-panel>
              <van-row> {{order.message}} </van-row>
              <van-row> {{order.otherMessage}} </van-row>
              <van-row>
                <van-button type="primary" size="small">查看物流</van-button>
                <van-button type="primary" size="small">追加评价</van-button>
                <van-button type="primary" size="small">删除订单</van-button>
              </van-row>
            </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { Card, Panel, Tab, Tabs, Col, Row, Button, Waterfall, Sku } from 'vant';
  import GoodsLine from '../goods_line/index.vue';
  import api from '../../axios/api.js';
  import { mapState } from 'vuex';
  export default {

    name: 'orders',
    props: {
      lineIds: Number
    },
    components: {
      [Card.name]: Card,
      [Sku.name]: Sku,
      [Button.name]: Button,
      [Waterfall.name]: Waterfall,
      [Row.name]: Row,
      [Col.name]: Col,
      [GoodsLine.name]: GoodsLine,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Panel.name]: Panel
    },
    data() {
      return {
        orderType: [
          { name: '全部', params: 'all' },
          { name: '待接单', params: 'need_apply' },
          { name: '待发货', params: 'need_send' },
          { name: '已完成', params: 'done' }
        ],
        active: 0,
        orders: [],
        disabled: false,
        currentOrderType: 'all'
      };
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    methods: {
      getOrder() {
        api.http('/get/orders', { type: this.currentOrderType, limit: 20, offset: 0 })
          .then(res => {
            this.orders = res.result;
          });
      },
      addOrder() {
        api.http('/get/orders', { type: this.currentOrderType, limit: 20, offset: 0 })
          .then(res => {
            for (let i = 0; i < res.result.length; i++) {
              this.orders.push(res.result[i]);
            }
          });
      },
      onClicOrderType(type) {
        this.currentOrderType = this.orderType[type].params;
        this.getOrder();
      },
      viewOrderDetial(order) {
        this.$router.push({ name: 'orderDetail', params: { orderId: order.name }});
      },
      loadMore() {
        var self = this;
        self.disabled = true;
        self.addOrder();
        self.disabled = false;
      }
    },
    computed: {
      submitBarText() {
        const count = this.checkedGoods.length;
        return '结算' + (count ? `(${count})` : '');
      },
      ...mapState({
        bottomActive: state => state.vantStore.bottomActive,
        headTitle: state => state.vantStore.headTitle,
        vantStore: state => state.vantStore
      })
    },
    created() {
      this.vantStore.headTitle = '订单列表';
      this.getOrder();
    }
  };

</script>
<style>
  .div_scroll {
    width:100%;
    height: 600px;
    overflow: scroll;
  }
</style>
