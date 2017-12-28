<template>
  <div>
    <template v-for="line in orderLines">
      <van-card
        title="标题"
        desc="描述"
        num="2"
        price="2.00"
        :thumb="line"
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
    data() {
      return {
        orderLines: ['//img13.360buyimg.com/mobilecms/s250x250_jfs/t13246/155/1465107553/74792/225378a2/5a211793Nd805d58b.jpg', '//img11.360buyimg.com/mobilecms/s250x250_jfs/t16417/281/621361351/151167/cd050782/5a375438Nded65264.jpg', '//img10.360buyimg.com/mobilecms/s250x250_jfs/t15298/93/734619756/194195/98a626c/5a376bffN461632dd.jpg', '//img11.360buyimg.com/mobilecms/s250x250_jfs/t16417/281/621361351/151167/cd050782/5a375438Nded65264.jpg']
      };
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
