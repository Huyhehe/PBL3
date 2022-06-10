<template>
  <div class="alert">
    <span class="title">{{ message }} Successfully!</span>
  </div>
</template>

<script>
export default {
  props: ["mess"],
  data() {
    return {
      message: this.mess,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/variables.less";
</style>
