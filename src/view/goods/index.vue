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
        <van-goods-action-mini-btn icon="cart">
          购物车
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn @click="addCartState=true">
          加入购物车
        </van-goods-action-big-btn>
        <van-goods-action-big-btn primary>
          立即购买
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>
    <van-popup v-model="addCartState" position="bottom">
      <van-sku
        v-model="showCustomAction"
        stepper-title="我要买"
        :sku="goods.sku"
        :goods="goods.goods"
        :goods-id="goods.goodsId"
        :show-add-cart-btn="true"
        :reset-stepper-on-hide="true"
        :initial-sku="goods.initialSku"
        @buy-clicked="handleBuyClicked"
        @add-cart="handleAddCartClicked"
      >
        <!-- 隐藏 sku messages -->
        <template slot="sku-messages"></template>
        <!-- 自定义 sku actions -->
        <template slot="sku-actions" slot-scope="props">
          <div class="van-sku-actions">
            <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">买买买</van-button>
          </div>
        </template>
      </van-sku>
    </van-popup>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  Sku,
  Popup,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
import { mapState } from 'vuex';

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Sku.name]: Sku,
    [Popup.name]: Popup,
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
      goods: {
        title: '美国伽力果（约680g/3个）',
        price: 2680,
        express: '免运费',
        remain: 19,
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '颜色', // skuKeyName：规格类目名称
              v: [
                {
                  id: '30349', // skuValueId：规格值 id
                  name: '红色', // skuValueName：规格值名称
                  imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                },
                {
                  id: '1215',
                  name: '蓝色',
                  imgUrl: 'https://img.yzcdn.cn/2.jpg'
                }
              ],
              skuKeyStr: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ]
        },
        picture: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      }
    };
  },
  created() {
    this.vantStore.headTitle = '产品详情';
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
    handleBuyClicked() {
      console.log('--------handleBuyClicked');
    },
    handleAddCartClicked() {
      console.log('--------handleAddCartClicked');
    },
    AddCart() {
      this.goodsCart.push(this.goods);
      // Toast('添加成功！');
      // console.log('--------');
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
    z-index: 10000;
  }
  .goods-detail{
    height:80%;
    overflow-y: auto;
  }
}
</style>
