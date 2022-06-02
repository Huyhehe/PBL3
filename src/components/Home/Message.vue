<template>
  <div class="message">
    <h1 class="title">THÔNG BÁO</h1>
    <div class="message-container">
      <div class="message-add">
        <span>Thêm thông báo mới</span>
        <unicon name="plus" />
      </div>
      <div class="message-box" v-for="message in messageList" :key="message.id">
        <div class="message-main">
          <span class="message-title">{{ message.title }}</span>
          <p class="message-content">
            {{ message.body }}
          </p>
          <span class="message-time">{{ message.datetime }}</span>
        </div>
        <div class="message-buttons" v-if="isManager">
          <button class="edit-button">
            <unicon name="pen" />
          </button>
          <button>
            <unicon name="trash-alt" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      messageList: [],
    };
  },
  created() {
    this.fetchMessage();
    this.messageList = this.getMessageList;
  },
  methods: {
    fetchMessage() {
      this.$store.dispatch("getAllMessage");
    },
  },
  computed: {
    ...mapGetters(["getMessageList", "isManager"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Message/message.less";
</style>
