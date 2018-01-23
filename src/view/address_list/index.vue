<template>
  <div class="van-contact-list">
    <van-radio-group :value="value" @input="$emit('input', $event)">
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="item.id">
          <van-radio :name="item.id" @click="$emit('select', item, index)">
            <p class="van-contact-list__text">联系人：{{ item.name }}</p>
            <p class="van-contact-list__text">联系电话：{{ item.tel }}</p>
            <p class="van-contact-list__text">地址：{{item.province}}{{item.city}}{{item.county}}{{item.address_detail}}</p>
            <van-tag type="success" v-if="item.isDefault">默认</van-tag>
          </van-radio>
          <van-icon name="edit" class="van-contact-list__edit" @click="$emit('edit', item, index)" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-cell icon="add" class="van-contact-list__add van-hairline--top" @click="$emit('add')" :title="addText" isLink />
  </div>
</template>

<script>
  import { Icon, Cell, Radio, CellGroup, RadioGroup, Tag } from 'vant';
  export default {
    name: 'address-list',

    components: {
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [Tag.name]: Tag,
      [Radio.name]: Radio,
      [CellGroup.name]: CellGroup,
      [RadioGroup.name]: RadioGroup
    },

    props: {
      value: {},
      addText: {
        type: String,
        default: '新建联系人'
      },
      list: {
        type: Array,
        default: () => []
      }
    }
  };
</script>
