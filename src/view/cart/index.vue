<template>
  <div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goodsCart"
        :key="item.id"
        :name="item.id"
      >
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar class="van-goods-submit-bar"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :buttonText="submitBarText"
    />
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar } from 'vant';
import { mapState } from 'vuex';
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },

  data() {
    return {
      checkedGoods: ['1', '2', '3']
    };
  },

  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    }
  },
  created() {
    this.vantStore.headTitle = '购物车';
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },
    ...mapState({
      activce: state => state.vantStore.bottomActive,
      headTitle: state => state.vantStore.headTitle,
      goodsCart: state => state.vantStore.goodsCart,
      vantStore: state => state.vantStore
    }),
    totalPrice() {
      return this.goodsCart.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
    }
  }
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    background-color: #fafafa;

    .van-checkbox__input {
      margin: 40px 0 0 10px;
    }

    .van-checkbox__label {
      margin-left: 20px;
    }

    .van-card__price {
      color: #f44;
    }
  }
  .van-goods-submit-bar{
    bottom: 50px;
    z-index: 10000;
  }
}
</style>
