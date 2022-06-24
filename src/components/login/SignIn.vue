<template>
  <div class="signIn">
    <!-- <span class="error-alert">Password doesn't match or unexist account</span> -->
    <Alert :mess="alertMsg" />
    <div class="signIn-container">
      <h1 class="signIn-title">Đăng nhập</h1>
      <div class="signIn-body">
        <form @submit.prevent="signIn()">
          <div class="signIn-inputs-wrapper">
            <input
              type="text"
              class="signIn-inputs account"
              required
              name="account"
              placeholder=" "
              v-model="userAccount"
            />
            <label for="account" class="signIn-inputs-labels">Tài khoản</label>
          </div>
          <div class="signIn-inputs-wrapper">
            <input
              type="password"
              class="signIn-inputs password"
              required
              name="password"
              placeholder=" "
              v-model="userPassword"
            />
            <label for="password" class="signIn-inputs-labels">Mật khẩu</label>
          </div>
          <div class="signIn-inputs-wrapper">
            <input
              type="submit"
              value="Đăng nhập"
              class="signIn-inputs"
              id="submit-button"
            />
          </div>
        </form>
      </div>
      <div class="signIn-forgot-password">
        <router-link to="/forgotPassword">Quên mật khẩu?</router-link>
      </div>
      <div class="sign-up">
        <form>
          <label>Chưa có tài khoản?</label>
          <router-link :to="{ name: 'Signup' }">Đăng ký</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Alert from "../Common Components/Alert.vue";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      userAccount: "",
      userPassword: "",
      alertMsg: "",
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    alertMessage() {
      this.alertMsg = this.$store.getters.getWarningMessage;
      const alertMessage = document.querySelector(".error-alert");
      setTimeout(() => {
        alertMessage.classList.remove("show");
      }, 3000);
    },
    async signIn() {
      const userAccount = this.userAccount;
      const userPassword = this.userPassword;
      await this.$store.dispatch("loginRequest", { userAccount, userPassword });
      if (localStorage.getItem("jwt") == null) {
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Login/signin.less";
</style>
