<template>
  <div :class="['van-contact-card', `van-contact-card--${type}`]" v-on="$listeners">
    <div class="van-contact-card__content">
      <template v-if="type === 'add'">
        <van-icon class="van-contact-card__icon" name="add2" />
        <div class="van-contact-card__text">{{ addText }}</div>
      </template>
      <template v-else-if="type === 'edit'">
        <van-icon class="van-contact-card__icon" name="contact" />
        <div class="van-contact-card__text">
          <div>联系人：{{ currentContact.name }}</div>
          <div>联系电话：{{ currentContact.tel }}</div>
          <div>地址:{{currentContact.province}}{{currentContact.city}}{{currentContact.county}}{{currentContact.address_detail}}</div>
        </div>
      </template>
    </div>
    <van-icon class="van-contact-card__arrow" name="arrow" />
  </div>
</template>

<script>
  import { Icon } from 'vant';
  export default {
    name: 'shop-address',

    components: {
      [Icon.name]: Icon
    },

    props: {
      type: {
        type: String,
        default: 'add'
      },
      currentContact: {
        type: Object
      },
      addText: {
        type: String,
        default: '添加订单联系人信息'
      }
    }
  };
</script>
