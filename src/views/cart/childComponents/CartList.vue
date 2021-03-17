<template>
  <div class="CartList">
    <scroll :probe-type="3" :pullUpload="true" class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartlist" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem';

import Scroll from "components/common/scroll/Scroll";


export default {
  name: 'CartList',
  components: {
    CartListItem,
    Scroll
  },
  props: {
    cartlist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .CartList {
    height: calc(570px - 40px);
  }
  .content {
    height: calc(100% - 44px -49px);
  }
</style>