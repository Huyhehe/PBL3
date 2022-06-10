<template>
  <div class="message">
    <h1 class="title">Thông báo</h1>
    <div class="message-container">
      <div class="message-add" @click="popUp(true)">
        <span>Thêm thông báo mới</span>
        <unicon name="plus" />
      </div>
      <div class="message-box-view">
        <div
          class="message-box"
          v-for="message in messageList"
          :key="message.notificationId"
        >
          <div class="message-main">
            <span class="message-title">{{ message.titleName }}</span>
            <p class="message-content">
              {{ message.content }}
            </p>
            <div class="message-time">
              <span class="message-time-post"
                >Được thêm vào lúc {{ message.datePost }} bởi
                {{
                  message.managerPost.firstName +
                  " " +
                  message.managerPost.lastName
                }}</span
              >
              <span v-if="message.dateUpdate" class="message-time-update"
                >Chỉnh sửa vào lúc {{ message.dateUpdate }} bởi
                {{
                  message.managerUpdate.firstName +
                  " " +
                  message.managerUpdate.lastName
                }}</span
              >
            </div>
          </div>
          <div class="message-buttons" v-if="isManager">
            <button @click.prevent="editMessage(message)" class="edit-button">
              <unicon name="pen" />
            </button>
            <button @click.prevent="deleteMessage(message.notificationId)">
              <unicon name="trash-alt" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isManager" class="message-popup">
      <div class="message-add-box">
        <form>
          <span class="message-add-box-header">Thêm thông báo</span>
          <div class="message-add-box-body">
            <div class="message-add-box-body-title message-add-box-body-item">
              <label for="title">Tiêu đề</label>
              <input
                v-model="newMessage.titleName"
                type="text"
                name="titleName"
                ref="titleName"
                placeholder="Enter"
                required
              />
            </div>
            <div class="message-add-box-body-content message-add-box-body-item">
              <label for="content">Nội dung</label>
              <textarea
                v-model="newMessage.content"
                type="text"
                name="content"
                ref="content"
                placeholder="Enter"
                required
              />
            </div>
          </div>
          <div class="message-add-box-buttons">
            <button @click.prevent="popUp(false)">Hủy</button>
            <button v-if="!editMessageId" @click.prevent="submit(true)">
              Thêm
            </button>
            <button v-if="editMessageId" @click.prevent="submit(false)">
              Hoàn tất
            </button>
          </div>
        </form>
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
      newMessage: {
        titleName: "",
        content: "",
      },
      editMessageId: null,
      currentUser: {},
    };
  },
  created() {
    this.fetchMessage();
  },
  methods: {
    async fetchMessage() {
      await this.$store.dispatch("getAllMessage");
      this.messageList = this.getMessageList;
      this.currentUser = this.userName;
    },
    popUp(flag) {
      const pop = document.querySelector(".message-popup");
      const backgr = document.querySelector(".message-container");
      if (flag) {
        pop.style.display = "flex";
        backgr.style.filter = "blur(5px)";
      } else {
        pop.style.display = "none";
        backgr.style.filter = "";
        this.newMessage.titleName = "";
        this.newMessage.content = "";
      }
    },
    async submit(option) {
      // option is true -> add new message
      //option is false -> edit message
      if (option) {
        const newMessage = {
          titleName: this.newMessage.titleName,
          content: this.newMessage.content,
        };
        await this.$store.dispatch("addMessage", newMessage);
      } else {
        const editedMessage = this.newMessage;
        editedMessage.notificationId = this.editMessageId;
        await this.$store.dispatch("editMessage", { editedMessage });
      }

      await this.$store.dispatch("getAllMessage");
      this.messageList = this.getMessageList;
      this.popUp(false);
      this.newMessage = {
        titleName: "",
        content: "",
      };
      this.editMessageId = null;
    },
    async deleteMessage(id) {
      await this.$store.dispatch("deleteMessage", id);
      await this.$store.dispatch("getAllMessage");
      this.messageList = this.getMessageList;
    },
    editMessage(message) {
      console.log(message.notificationId);
      this.editMessageId = message.notificationId;
      this.newMessage.titleName = message.titleName;
      this.newMessage.content = message.content;
      this.popUp(true);
    },
  },
  computed: {
    ...mapGetters(["getMessageList", "isManager", "userName"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Message/message.less";
</style>
