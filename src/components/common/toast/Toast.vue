<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    showToast(message, duration=1500) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
        console.log(this.isShow, this.message);
      },duration);

    }
  }
}
</script>

<style scoped>
  .toast {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 99;

    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
</style>