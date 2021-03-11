<template>
  <div class="goods">
    <GoodsItem class="item" v-for="(item, index) in goodslist" :key="index" :goods="item"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from 'components/content/goods/GoodsItem.vue';
export default {
  name: 'GoodsList',
  components: {
    GoodsItem,
  },
  props: {
    goodslist: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .item {
    width: 48%;
  }
</style>