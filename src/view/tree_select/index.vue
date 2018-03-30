<template>
  <div class="van-tree-select" :style="{ height: mainHeight + 'px;width:20px;' }">
    <div class="van-tree-select__nav">
      <div
        v-for="(item, index) in items"
        class="van-tree-select__nitem"
        :class="{ 'van-tree-select__nitem--active': mainActiveIndex === item.index }"
        @click="$emit('navclick', item.index)">
        {{ item.text }}
      </div>
    </div>
    <div class="van-tree-select__content" :style="{ height: itemHeight + 'px' }">
      <div
        v-for="item in subItems"
        :key="item.id"
        class="van-tree-select__item">
        <van-tag type="primary" @click="$emit('navclick', item.id)" >{{ item.text }}</van-tag>
        <div v-for="(child, index) in item.children">
          <van-row v-if="Math.round(index%3)==2">
            <div @click="$emit('catclick', item.children[index-2].id)"><van-col span="8">{{item.children[index-2].text}}</van-col></div>
            <div @click="$emit('catclick', item.children[index-1].id)"><van-col span="8" >{{item.children[index-1].text}}</van-col></div>
            <div @click="$emit('catclick', item.children[index-1].id)"><van-col span="8">{{item.children[index-1].text}}</van-col></div>
          </van-row>
        </div>
        <van-row v-if="Math.round(item.children.length%3)!=2">
          <div @click="$emit('catclick', item.children[item.children.length-1])" ><van-col span="8"
                        v-if="Math.round(item.children.length%3)>=0">{{item.children[item.children.length-1].text}}</van-col> </div>
          <van-col span="8" @click="$emit('catclick', item.children[item.children.length-2].id)"
                   v-if="Math.round(item.children.length%3)>=1">{{item.children[item.children.length-2].text}}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { Row, Col, Tag } from 'vant';
  export default {
    name: 'tree-select',
    components: {
      [Row.name]: Row,
      [Tag.name]: Tag,
      [Col.name]: Col
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      mainActiveIndex: {
        type: Number,
        default: 0
      },
      activeId: {
        type: Number,
        default: 0
      },
      maxHeight: {
        type: Number,
        default: 300
      }
    },

    computed: {
      subItems() {
        const selectedItem = this.items[this.mainActiveIndex] || {};
        return selectedItem.children || [];
      },
      mainHeight() {
        // const maxHeight = Math.max(this.items.length * 44, this.subItems.length * 44);
        return Math.min(600, 600);
      },
      itemHeight() {
        return Math.min(800, 800);
      }
    },

    methods: {
      onItemSelect(data) {
        this.$emit('itemclick', { ...data });
      }
    }
  };
</script>
