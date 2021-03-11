<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    },
    pullUpload: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    refresh() {
      // this.scroll.refresh();
      // console.log('--------');
      this.scroll && this.scroll.refresh();
    },
    backTop() {
      this.scroll.scrollTo(0,0,400);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  },
  mounted() {
    // 1.创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpload,
      click: true
    });

    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position);
    });
    
    // 3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      // 告诉首页 我已经到达底部
      this.$emit('pullingUp');
    })
  },
  
}
</script>

<style>

</style>