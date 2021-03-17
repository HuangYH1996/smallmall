<template>
  <div class="Cart">
    <nav-bar>
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <cart-list :cartlist="cartList"></cart-list>
    <bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComponents/CartList';
import BottomBar from './childComponents/BottomBar';

import {mapGetters} from 'vuex';

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters([
      'cartListLength',
      'cartList'
    ])
  }
}
</script>

<style scoped>
  .Cart {
    height: 100vh;
  }
</style>