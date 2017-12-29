<template>
  <div>
    <template v-for="line in orderLines">
      <van-card
        :title="line.title"
        :desc="line.desc"
        :num="line.num"
        :price="line.price"
        :thumb="line.image"
      />
    </template>
  </div>
</template>
<script>
  import { Card } from 'vant';
  export default {
    name: 'goods-lines',
    components: {
      [Card.name]: Card
    },
    props: {
      orderLines: Array
    },
    methods: {
    }
  };

</script>
<style>
  .cell_product{
    display:inline;
  }

</style>
