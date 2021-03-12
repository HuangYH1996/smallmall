<template>
  <swiper class="swcontent">
    <swiper-item v-for="(item, index) in detailImages" :key="index">
      <img :src="item" alt="图片"/>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    detailImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },

}
</script>

<style scoped>
  .swcontent {
    height: 300px;
    overflow: hidden;
  }
</style>