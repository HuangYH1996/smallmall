<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="图片" @load="swiperLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      imageLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperLoad() {
      // this.$emit('swiperLoad');
      if (!this.imageLoad) {
        console.log('swiperLoad');
        this.$emit('swiperLoad');
        this.imageLoad = true;
      } 
    }
  }
};
</script>

<style>
</style>