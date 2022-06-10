<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="user-name-tag">{{ userName }}</div>
      <div class="sidebar-item" id="menu-button" @click="toggleSidebar()">
        <unicon name="bars" width="35" height="35"></unicon>
      </div>
    </div>
    <div class="sidebar-body">
      <router-link
        :to="{ name: item.name }"
        v-for="item in sidebarItems"
        :key="item.text"
        class="sidebar-item"
      >
        <unicon :name="item.icon" />
        <div class="sidebar-item-text">
          <span>{{ item.title }}</span>
          <span v-if="item.sub" class="notification-bubble">{{
            item.sub
          }}</span>
        </div>
      </router-link>
    </div>
    <div class="sidebar-footer">
      <router-link to="/login" class="router-link">
        <div class="sidebar-item" id="sign-out-button" @click="SIGN_OUT()">
          <unicon name="signout"></unicon>
          <span>Sign out</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      sidebarItems: [
        {
          title: "Trang chủ",
          icon: "estate",
          name: "Dashboard",
        },
        {
          title: "Thông tin cá nhân",
          icon: "user",
          name: "Info",
        },
        {
          title: "Thông báo",
          icon: "envelope-alt",
          // sub: 20,
          name: "Message",
        },
        {
          title: "Hóa đơn",
          icon: "bill",
          name: "Receipt",
        },
        {
          title: "Kho",
          icon: "inbox",
          name: "Storage",
        },
        {
          title: "Cài đặt",
          icon: "setting",
          name: "Setting",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userName", "isManager"]),
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("close");
    },
    ...mapMutations(["SIGN_OUT"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Sidebar/sidebar.less";
</style>
