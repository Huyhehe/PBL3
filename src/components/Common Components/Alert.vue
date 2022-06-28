<template>
  <div class="alert error-alert">
    <span class="title">{{ message }}</span>
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
  watch: {
    mess() {
      this.message = this.mess;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/variables.less";
.error-alert {
  position: absolute;
  top: 20px;
  right: 0;
  transform: translateX(100%);
  background: @error-color;
  padding: 20px 10px;
  transition: all 0.2s ease-out;
  opacity: 0;
  z-index: 1000;
  color: @background-color-light;
  &.show {
    transform: translateX(-10%);
    opacity: 1;
  }
  &::before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 7.5px;
    background-color: #d4626d;
    animation: alertAnimation 0.2s;
  }
}
</style>
