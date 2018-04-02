<template>
  <div style="margin-bottom: 100px">
    <shop-address
      :type="cardType"
      :currentContact="currentContact"
      @click="showAddressList = true"
    />
    <van-popup v-model="showAddressList" position="bottom"  class="pop-full">
      <address-list
        v-model="chosenContactId"
        :list="addressList"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>
    <van-popup v-model="showEdit" position="bottom"  class="pop-full">
      <van-address-edit
        :area-list="areaList"
        show-postal
        :addressInfo="this.addressInfo"
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </van-popup>
    <div v-for="shop in  orderDetail.shopList">
      <van-panel :title="shop.shopName" desc="" :status="shop.status">
        <div v-for="(line, index) in shop.productLine" :key="index">
          <van-card
            :title="line.title"
            :desc="line.desc"
            :num="line.num"
            :price="line.price"
            :thumb="line.image"
          />
        </div>
      </van-panel>
    </div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showCouponList = true"
    />

    <!-- 优惠券列表 -->
    <van-popup v-model="showCouponList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
    <van-submit-bar
      :price="orderDetail.allPrice"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
  import { Card, ContactCard, ContactList, ContactEdit, Popup, AddressEdit, Area, Panel, CouponCell, CouponList, SubmitBar } from 'vant';
  import api from '../../axios/api.js';
  import shopAddress from '../address_list/index.vue';
  import AddressList from '../address/index.vue';
  import areaList from '../../common/data/area.json';
  import { mapState } from 'vuex';
  const coupon = {
    available: 1,
    discount: 0,
    denominations: 150,
    origin_condition: 0,
    reason: '',
    value: 150,
    name: '优惠券名称',
    start_at: 1489104000,
    end_at: 1514592000
  };
  export default {
    name: 'goods-lines',
    components: {
      [Card.name]: Card,
      [CouponCell.name]: CouponCell,
      [SubmitBar.name]: SubmitBar,
      [CouponList.name]: CouponList,
      [Panel.name]: Panel,
      [AddressList.name]: AddressList,
      [Area.name]: Area,
      [ContactCard.name]: ContactCard,
      [AddressEdit.name]: AddressEdit,
      [shopAddress.name]: shopAddress,
      [ContactList.name]: ContactList,
      [ContactEdit.name]: ContactEdit,
      [Popup.name]: Popup
    },
    computed: {
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },
      currentContact() {
        const id = this.chosenContactId;
        return id !== null ? this.addressList.filter(item => item.id === id)[0] : {};
      },
      ...mapState({
        activce: state => state.vantStore.bottomActive,
        headTitle: state => state.vantStore.headTitle,
        vantStore: state => state.vantStore
      })
    },

    data() {
      return {
        areaList: areaList,
        orderDetail: {},
        chosenContactId: null,
        editingContact: {},
        showAddressList: false,
        showCouponList: false,
        showEdit: false,
        addressInfo: {},
        searchResult: [],
        isEdit: false,
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        addressList: []
      };
    },
    created() {
      this.vantStore.headTitle = '订单详情';
      api.http('/get/orderDetail', { orderId: this.$route.params.order_id })
        .then(res => {
          this.orderDetail = res.result;
        });
      api.http('/get/address_list', {})
        .then(res => {
          this.addressList = res.result;
          this.chosenContactId = this.addressList ? this.addressList[0].id : 0;
        });
    },
    methods: {
      // 优惠券相关操作
      onChange(index) {
        console.log(index);
        this.showCouponList = false;
        this.chosenCoupon = index;
        if (index >= 0 && this.coupons[index].discount) {
          console.log(this.orderDetail.originPrice, this.coupons[index].discount, '-----------');
          this.orderDetail.allPrice = this.orderDetail.originPrice * this.coupons[index].discount;
        } else if (index >= 0) {
          console.log(this.coupons[index].value, '-----------', this.orderDetail.originPrice);
          this.orderDetail.allPrice = this.orderDetail.originPrice - this.coupons[index].value;
        } else {
          this.orderDetail.allPrice = this.orderDetail.originPrice;
        }
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },
      // 添加联系人
      onAdd() {
        this.editingContact = { id: this.addressList.length };
        console.log(this.editingContact, 'editingContact');
        this.isEdit = false;
        this.showEdit = true;
      },

      // 编辑联系人
      onEdit(item) {
        this.chosenContactId = item.id;
        this.addressInfo = item;
        this.isEdit = true;
        this.showEdit = true;
        this.editingContact = item;
      },

      // 选中联系人
      onSelect() {
        this.showAddressList = false;
      },

      // 保存联系人
      onSave(info) {
        this.showEdit = false;
        this.showAddressList = false;

        if (this.isEdit) {
          this.addressList = this.addressList.map(item => item.id === info.id ? info : item);
        } else {
          this.addressList.push(info);
        }
        this.chosenContactId = info.id;
      },
      onChangeDetail(val) {
      },
      // 删除联系人
      onDelete(info) {
        this.showEdit = false;
        this.addressList = this.addressList.filter(item => item.id !== info.id);
        if (this.chosenContactId === info.id) {
          this.chosenContactId = null;
        }
      },
      // 提交订单的方法
      onSubmit: function() {

      }
    },
    watch: {

    }
  };

</script>
<style>
.pop-full{
  width: 100%;
  height: 100%;
}
</style>
