<template>
  <div class="goods">
    <div class="goods-detail">
      <van-swipe class="goods-swipe">
        <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
          <img :src="thumb" >
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
        <van-cell>
          <div class="goods-title">{{ goods.title }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>
        <van-cell class="goods-express">
          <van-col span="10">运费：{{ goods.express }}</van-col>
          <van-col span="14">剩余：{{ goods.remain }}</van-col>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell value="进入店铺" icon="shop" isLink>
          <template slot="title">
            <span class="van-cell-text">有赞的店</span>
            <van-tag type="danger">官方</van-tag>
          </template>
        </van-cell>
        <van-cell title="线下门店" icon="location" isLink></van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell title="查看商品详情" isLink></van-cell>
      </van-cell-group>
    </div>
    <div>
      <van-goods-action class="van-goods-action-shop">
        <van-goods-action-mini-btn icon="chat">
          客服
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn icon="cart"  @click="showCart">
          购物车
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn @click="addCartState=true">
          加入购物车
        </van-goods-action-big-btn>
        <van-goods-action-big-btn primary  @click="addCartState=true">
          立即购买
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>
    <goods-sku v-model="addCartState"
        stepper-title="我要买"
        :sku="sku"
        :goods="goods"
        :goods-id="goods.goodsId"
        :show-add-cart-btn="true"
        :sku-choose="chooseSku"
        :reset-stepper-on-hide="true"
        @buy-clicked="handleBuyClicked"
        @add-cart="handleAddCartClicked"
      >
      </goods-sku>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  button,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  Row,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
import { mapState } from 'vuex';
import GoodsSku from '../good_sku/containers/SkuContainer.vue';
import api from '../../axios/api.js';
export default {
  components: {
    [Tag.name]: Tag,
    [GoodsSku.name]: GoodsSku,
    [Col.name]: Col,
    [Row.name]: Row,
    [button.name]: button,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },

  data() {
    return {
      addCartState: false,
      showCustomAction: true,
      chooseSku: {},
      sku: {},
      goods: {
        // 商品标题
        title: '测试商品',
        price: '1000',
        thumb: [
          'http://img13.360buyimg.com/n0/jfs/t6115/200/8176463418/138238/65662816/5987c829N9c0f5286.jpg',
          'http://img13.360buyimg.com/n0/jfs/t6043/305/5636125253/87985/21230f90/596f169aN1246fe10.jpg'
        ],
        // 默认商品 sku 缩略图
        picture: 'http://img13.360buyimg.com/n4/jfs/t6043/305/5636125253/87985/21230f90/596f169aN1246fe10.jpg'
      },
      skuData: {
//        // 商品 id
//        goodsId: '946755',
//        // 留言信息
//        selectedNum: 1,
//        // 选择的 sku 组合
//        selectedSkuComb: {
//          id: 2257,
//          price: 100,
//          s1: '30349',
//          s2: '1193',
//          s3: '0',
//          stock_num: 111
//        }
      }
    };
  },
  created() {
    this.vantStore.headTitle = '产品详情';
    api.http('/get/getGoodsSku', { orderId: this.$route.params.order_id })
      .then(res => {
        this.sku = res.result;
      });
  },
  computed: {
    ...mapState({
      bottomActive: state => state.vantStore.bottomActive,
      headTitle: state => state.vantStore.headTitle,
      goodsCart: state => state.vantStore.goodsCart,
      vantStore: state => state.vantStore
    })
  },
  methods: {
    OnClickColseOverlay() {
      this.addCartState = true;
    },
    handleBuyClicked({ goodsId, selectedNum, selectedSkuComb }) {
      var self = this;
      api.http('/get/getGoodsCartMessage', { orderId: this.$route.params.order_id })
        .then(res => {
          res.result['num'] = selectedNum;
          res.result['id'] = this.vantStore.goodsCart.length + 1;
          self.vantStore.goodsCart.push(res.result);
        });
      Toast('加入购物车成功！');
      this.addCartState = false;
    },
    handleAddCartClicked({ goodsId, selectedNum, selectedSkuComb }) {
      var self = this;
      api.http('/get/getGoodsCartMessage', { orderId: this.$route.params.order_id })
        .then(res => {
          res.result['num'] = selectedNum;
          res.result['id'] = this.vantStore.goodsCart.length + 1;
          self.vantStore.goodsCart.push(res.result);
        });
      Toast('加入购物车成功！');
      this.addCartState = false;
    },
    showCart() {
      this.$router.push({ 'name': 'cart' });
    },
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    }
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px 5px 0;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }
  .van-goods-action-shop{
    z-index: 50;
  }
  .goods-detail{
    height:80%;
    overflow-y: auto;
  }
}
</style>
