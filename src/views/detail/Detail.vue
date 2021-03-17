<template>
  <div class="detail">
    <detail-nav-bar @detailItem="detailItem" ref="detailnav"></detail-nav-bar>
    <scroll
      class="decontent"
      :probe-type="3"
      :pullUpload="true"
      ref="detailscroll"
      @scroll="handleScroll"
    >
      <detail-swiper :detailImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="itemParams"
      ></detail-param-info>
      <detail-comment-info
        ref="comments"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommends" :goodslist="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top class="backtop"
     @click.native="backClick" 
     v-show="isShow"
     />
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";

import { getDetail, Goods, getRecommend } from "network/detail";

import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComponents/DetailCommentInfo";
import DetailBottomBar from "views/detail/childComponents/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import { mapActions } from 'vuex';

import { debounce } from "../../common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      iid: null,
      result: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      itemsTops: [0, 100, 200, 300],
      currentIndex: 0,
      isShow: false
    };
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad() {
      this.$refs.detailscroll.refresh();
      // 节流为什么没运行？？？
      // debounce(this.getItemTops,200) 
      this.itemsTops = [];
      this.itemsTops.push(0);
      this.itemsTops.push(this.$refs.params.$el.offsetTop);
      this.itemsTops.push(this.$refs.comments.$el.offsetTop);
      this.itemsTops.push(this.$refs.recommends.$el.offsetTop);
    },
    detailItem(index) {
      // console.log(index);
      this.$refs.detailscroll.scrollTo(0, -this.itemsTops[index], 200);
    },
    getItemTops() {
      this.itemsTops = [];
      this.itemsTops.push(0);
      this.itemsTops.push(this.$refs.params.$el.offsetTop);
      this.itemsTops.push(this.$refs.comments.$el.offsetTop);
      this.itemsTops.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.itemsTops);
    },
    handleScroll(position) {
      // console.log(position.y);
      let Y = -position.y;
      for (let i=0; i<this.itemsTops.length-1; i++) {
        if (this.currentIndex !== i && Y >= this.itemsTops[i] && Y < this.itemsTops[i+1]) {
          this.currentIndex = i;
        } 
      }
      if (this.currentIndex !== 3 && Y >= this.itemsTops[this.itemsTops.length-1]) {
        this.currentIndex = this.itemsTops.length - 1;
      }
      this.$refs.detailnav.currentIndex = this.currentIndex;

      // 1/返回顶部
      if (Y > 1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 回到顶部
    backClick() {
      this.$refs.detailscroll.backTop();
    },
    // 添加购物车
    addToCart() {
      // console.log(this.goodsInfo);
      // 1.获取购物车展示所需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;
      // console.log(product);
      // 2.将商品添加到购物车
      // this.$store.dispatch('addCart', product);
      
      this.addCart(product).then(res => {
        // console.log(this.$toast);
        // console.log(this.$toast.showToast);
        // this.$toast.show(res, 2000);
        this.$toast.showToast(res,2000);
      });
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求推荐数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取数据
      const data = res.result;
      // 2.取出轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 3.创建商品的对象
      this.goodsInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4.取出店铺的信息
      this.shopInfo = data.shopInfo;
      // 5.取出详情信息
      this.detailInfo = data.detailInfo;
      // 6.取出参数信息
      this.itemParams = data.itemParams;
      // 7.取出一条评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 1;
  height: 100vh;
  background-color: #fff;
}

.decontent {
  background-color: #fff;
  height: calc(100vh - 44px - 51px);
}
</style>