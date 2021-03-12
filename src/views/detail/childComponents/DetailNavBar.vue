<template>
  <div class="detail-navbar">
    <nav-bar>
      <div slot="left" class="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in navbarlist" 
        :key="index" 
        class="title-item"
        :class="{activate: index===currentIndex}"
        @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      navbarlist: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
    back() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .detail-navbar {
    position: relative;
    z-index: 9;
    font-size: 13px;
  }

  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .left {
    margin-top: 8px;
  }

  .activate {
    color: red;
  }
</style>