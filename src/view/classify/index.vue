<template>
    <div class="content_main">
      <div  style="display:block">
        <tree-select :items="classList"
                    :main-active-index="mainActiveIndex"
                    :active-id="activeId"
                    @navclick="onNavClick"
                    @catclick="onCatClick">
        </tree-select>
      </div>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import TreeSelect from '../tree_select/index.vue';
  import api from '../../axios/api.js';
  export default {
    components: {
      [TreeSelect.name]: TreeSelect
    },
    data() {
      return {
        // 位置左侧是选中的id
        mainActiveIndex: 1,
        activeId: 123,
        classList: [],
        activeKey: ''
      };
    },
    created() {
      this.vantStore.headTitle = '分类';
      api.http('/get/classList', { params: { domain: '', limit: 10, offset: 5 }})
        .then(res => {
          this.classList = res.result;
        });
    },
    computed: {
      ...mapState({
        bottomActive: state => state.vantStore.bottomActive,
        headTitle: state => state.vantStore.headTitle,
        vantStore: state => state.vantStore
      })
    },
    methods: {
      ...mapMutations([
        'COURSE_PARAMS', 'TOUCHEND', 'COURSE_TYPE', 'COURSE_ID'
      ]),
      onNavClick: function(catId) {
        this.mainActiveIndex = catId;
      },
      onCatClick: function(catId) {
        console.log(catId, '===catId');
        this.$router.push({ name: 'goodsList' });
      }
    }
  };
</script>
<style lang="sass">

</style>
