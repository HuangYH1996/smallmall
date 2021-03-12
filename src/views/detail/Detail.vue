<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="decontent" :probe-type="3" :pullUpload="true" ref="detailscroll">
      <detail-swiper :detailImages="topImages"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="itemParams"></detail-param-info> 
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goodslist="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";

import { getDetail, Goods , getRecommend} from "network/detail";

import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComponents/DetailCommentInfo";

import GoodsList from 'components/content/goods/GoodsList';

import Scroll from "components/common/scroll/Scroll";

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
    GoodsList
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
      recommends: []
    };
  },
  methods: {
    detailImageLoad() {
      this.$refs.detailscroll.refresh();
    }
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求推荐数据
    getDetail(this.iid).then((res) => {
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
    })
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
    height: calc(100vh - 44px);
  }
</style>