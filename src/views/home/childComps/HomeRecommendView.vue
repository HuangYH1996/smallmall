<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="img">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    font-size: 12px;
    text-align: center;
    padding: 10px 0px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend img {
    height: 70px;
    width: 70px;
  }
</style>