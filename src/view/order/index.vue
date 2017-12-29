<template>
  <div>
    <shop-address
      :type="cardType"
      :currentContact="currentContact"
      @click="showList = true"
    />
    <van-popup v-model="showList" position="bottom"  class="pop-full">
      <address-list
        v-model="chosenContactId"
        :list="list"
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

  </div>
</template>
<script>
  import { Card, ContactCard, ContactList, ContactEdit, Popup, AddressEdit, Area } from 'vant';
  import api from '../../axios/api.js';
  import shopAddress from '../addressList/index.vue';
  import AddressList from '../address/index.vue';
  import areaList from '../../common/data/area.json';
  import { mapState } from 'vuex';
  export default {
    name: 'goods-lines',
    components: {
      [Card.name]: Card,
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
        return id !== null ? this.list.filter(item => item.id === id)[0] : {};
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
        showList: false,
        showEdit: false,
        addressInfo: {},
        searchResult: [],
        isEdit: false,
        list: [{
          name: '张三',
          tel: '13000000000',
          address: '13000000000',
          province: '上海市',
          city: '上海市',
          areaCode: 310110,
          county: '杨浦区',
          isDefault: false,
          addressDetail: '国伟路135号',
          id: 123344
        }, {
          name: '里斯',
          tel: '13000000000',
          address: '13000000000',
          province: '上海市',
          city: '上海市',
          county: '杨浦区',
          areaCode: 310110,
          isDefault: false,
          addressDetail: '国伟路135号',
          id: 123345
        }]
      };
    },
    created() {
      this.vantStore.headTitle = '订单详情';
      api.http('/get/orderDetail', { orderId: this.$route.params.order_id })
        .then(res => {
          this.orderDetail = res.result;
        });
    },
    methods: {
      // 添加联系人
      onAdd() {
        this.editingContact = { id: this.list.length };
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
        this.showList = false;
      },

      // 保存联系人
      onSave(info) {
        this.showEdit = false;
        this.showList = false;

        if (this.isEdit) {
          this.list = this.list.map(item => item.id === info.id ? info : item);
        } else {
          this.list.push(info);
        }
        this.chosenContactId = info.id;
      },
      onChangeDetail(val) {
//        if (val) {
//          this.searchResult = [{
//            name: '黄龙万科中心',
//            address: '杭州市西湖区'
//          }];
//        } else {
//          this.searchResult = [];
//        }
      },
      // 删除联系人
      onDelete(info) {
        this.showEdit = false;
        this.list = this.list.filter(item => item.id !== info.id);
        if (this.chosenContactId === info.id) {
          this.chosenContactId = null;
        }
      }
    }
  };

</script>
<style>
.pop-full{
  width: 100%;
  height: 100%;
}
</style>
