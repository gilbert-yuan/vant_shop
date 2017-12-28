<template>
  <div id="search_goods" class="search_goods">
    <van-cell-group>
        <van-field v-model="value" :placeholder="placeholder" focus="true"/>
    </van-cell-group>
    <van-button size="small">确认搜索</van-button>
    <van-cell-group >
      <h3>搜索历史</h3>
      <van-tag>标签</van-tag>
      <van-tag type="danger">标签</van-tag>
      <van-tag type="success">标签</van-tag>
      <van-tag type="primary">标签</van-tag>
    </van-cell-group>
  </div>
</template>

<script>
  import { Cell, CellGroup, Tag, Col, Field, Button } from 'vant';
  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Tag.name]: Tag,
      [Button.name]: Button,
      [Col.name]: Col,
      [Field.name]: Field
    },
    data() {
      return {
        placeholder: '搜索产品',
        value: '',
        focusflag: true
      };
    }
  };
</script>
<style type="less">
  .search_goods{

  }
</style>
