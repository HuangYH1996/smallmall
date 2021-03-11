<template>
  <div id="Home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <TabControl
        :category="['流行', '新款', '精选']"
        @typeCilck="typeCilck"
        ref="tabcontrol1"
        v-show="isFixed"
      ></TabControl>
    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pullUpload="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <FeatureView />
      <TabControl
        :category="['流行', '新款', '精选']"
        @typeCilck="typeCilck"
        ref="tabcontrol2"
      ></TabControl>
      <GoodsList :goodslist="goodsList[this.currentType].list"></GoodsList>
    </scroll>
    <back-top class="backtop" @click.native="backClick" v-show="isShow"/>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import HomeRecommendView from "views/home/childComps/HomeRecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "../../../src/common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goodsList: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabcontrolHeight: 0,
      isFixed: false
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求多个数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 对调用频繁对函数 用防抖动函数做一层包装
    const refresh = debounce(this.$refs.scroll.refresh,200);
    // 3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      // 进行防抖操作
      refresh();
      // this.$refs.scroll && this.$refs.scroll.refresh();
    });
  },
  methods: {
    typeCilck(index) {
      if (index === 0) {
        this.currentType = "pop";
      } else if (index === 1) {
        this.currentType = "new";
      } else if (index === 2) {
        this.currentType = "sell";
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    // 获取tabcontrol高度
    swiperLoad() {
      this.tabcontrolHeight = this.$refs.tabcontrol2.$el.offsetTop;
      console.log(this.tabcontrolHeight);
    }
    ,
    // 回到顶部
    backClick() {
      this.$refs.scroll.backTop();
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    contentScroll(position) {
      // 1/返回顶部
      if (-position.y > 1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      // 2.吸顶
      if (-position.y > this.tabcontrolHeight) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    // 获取数据相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 此处箭头函数的this 为调用created的this
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      getHomeGoods(type, this.goodsList[type].page).then((res) => {
        this.goodsList[type].list.push(...res.data.list);
        this.goodsList[type].page += 1;
        // console.log(res.data.list);
      });
    },
  },
};
</script>

<style scoped>
#Home {
  padding-top: 44px;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.content {
  height: 575px;
  overflow: hidden;
}

</style>
