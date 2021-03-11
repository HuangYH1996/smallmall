<template>
  <div class="tabcontrol">
    <div class="itemtab" v-for="(item, index) in category" :key="index"
    @click="itemClick(index)" :class="{activate: isActivate(index)}">
      <span :class="{hasBorder: isActivate(index)}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    category: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('typeCilck', index);
    },
    isActivate(index) {
      return this.currentIndex === index;
    }
  }
}
</script>

<style>
  .tabcontrol {
    display: flex;
    text-align: center;
    padding: 8px;

    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }

  .itemtab {
    flex: 1;
  }

  .itemtab span {
    padding-bottom: 5px;
  }

  .hasBorder {
    border-bottom: 3px solid var(--color-high-text);
  }

  .activate {
    color: var(--color-high-text);
  }
</style>