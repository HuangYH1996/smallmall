<template>
  <div id="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
  
<style scoped>
  #nav-bar {
    display: flex;
    /* 导航栏一般高44px */
    height: 44px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-color: var(--color-tint);
    /* line-height: 44px; */
  }

  .left,
  .right {
    /* flex: 0 0 60px;  */
    width: 60px;
    margin: 3px;
  }

  .center {
    flex: 1;
    margin: 3px;
    color: #fff;
    padding-top: 10px;
    text-align: center;
  }
</style>