<template>
  <div class="sign-up">
    <Alert :mess="alertMsg" />
    <div class="signUp-container">
      <h1 class="signUp-title">Đăng ký</h1>
      <div class="signUp-body">
        <form>
          <div class="signUp-inputs-wrapper">
            <div class="wrapper-input">
              <input
                type="text"
                class="signUp-inputs"
                required
                name="id"
                placeholder=" "
                v-model="newUser.userID"
                @blur="validateUserID"
                @input="validateUserID"
              />
              <label for="id" class="signUp-inputs-labels">Mã nhân viên</label>
            </div>
            <span class="wrapper-warning" id="warningID"
              >Vui lòng nhập trường này</span
            >
          </div>
          <div class="signUp-inputs-wrapper">
            <div class="wrapper-input">
              <input
                type="text"
                class="signUp-inputs"
                required
                name="account"
                placeholder=" "
                v-model="newUser.userName"
                @blur="validateUserName"
                @input="validateUserName"
              />
              <label for="account" class="signUp-inputs-labels"
                >Tài khoản</label
              >
            </div>
            <span class="wrapper-warning" id="warningUN"
              >Vui lòng nhập trường này</span
            >
          </div>
          <div class="signUp-inputs-wrapper">
            <div class="wrapper-input">
              <input
                type="password"
                class="signUp-inputs"
                required
                placeholder=" "
                v-model="newUser.password"
                @input="validatePassword"
                @blur="validatePassword"
              />
              <label for="password" class="signUp-inputs-labels"
                >Mật khẩu</label
              >
            </div>
            <span class="wrapper-warning" id="warningPW"
              >Mật khẩu phải có ít nhất 6 kí tự</span
            >
          </div>
          <div class="signUp-inputs-wrapper">
            <div class="wrapper-input">
              <input
                type="password"
                class="signUp-inputs"
                required
                placeholder=" "
                v-model="newUser.confirmPassword"
                @blur="validateConfirmPassword"
                @input="validateConfirmPassword"
              />
              <label for="confirmPassword" class="signUp-inputs-labels"
                >Nhập lại mật khẩu</label
              >
            </div>
            <span class="wrapper-warning" id="warningCPW"
              >Không trùng khớp với mật khẩu đã nhập</span
            >
          </div>
          <div class="signUp-inputs-wrapper">
            <input
              type="button"
              value="Đăng ký"
              class="signUp-inputs"
              id="submit-button"
              @click="register"
            />
          </div>
        </form>
      </div>
      <div class="sign-in">
        <form>
          <div>
            <label>Đã có tài khoản?</label>
            <router-link to="/login">Đăng nhập</router-link>
          </div>
          <div>
            <label>Xác thực lại?</label>
            <button @click="reVerify">Xác thực</button>
          </div>
        </form>
      </div>
      <div class="signUp-extra-content"></div>
    </div>
    <keep-alive
      ><router-view class="confirm-token" @alertReVerify="alertReVerify"
    /></keep-alive>
  </div>
</template>

<script>
import Alert from "../Common Components/Alert.vue";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      newUser: {
        userID: "",
        userName: "",
        password: "",
        confirmPassword: "",
        imageFile: null,
      },
      alertMsg: "",
    };
  },
  methods: {
    alertReVerify(alertMsg) {
      this.alertMsg = alertMsg;
    },
    alertMessage() {
      this.alertMsg = this.$store.getters.getWarningMessage;
      const alertMessage = document.querySelector(".error-alert");
      setTimeout(() => {
        alertMessage.classList.remove("show");
      }, 3000);
    },
    validateConfirmPassword(e) {
      const inputBox = e.target;
      const warning = document.getElementById("warningCPW");
      if (this.newUser.confirmPassword != this.newUser.password) {
        inputBox.style.border = "1px solid red";
        warning.style.display = "block";
      } else {
        inputBox.style.border = "";
        warning.style.display = "";
      }
    },
    validatePassword(e) {
      const inputBox = e.target;
      const warning = document.getElementById("warningPW");
      if (this.newUser.password.length < 6) {
        inputBox.style.border = "1px solid red";
        warning.style.display = "block";
      } else {
        inputBox.style.border = "";
        warning.style.display = "";
      }
    },
    validateUserID(e) {
      const inputBox = e.target;
      const warning = document.getElementById("warningID");
      if (this.newUser.userID.length < 1) {
        inputBox.style.border = "1px solid red";
        warning.style.display = "block";
      } else {
        inputBox.style.border = "";
        warning.style.display = "";
      }
    },
    validateUserName(e) {
      const inputBox = e.target;
      const warning = document.getElementById("warningUN");
      if (this.newUser.userName.length < 1) {
        inputBox.style.border = "1px solid red";
        warning.style.display = "block";
      } else {
        inputBox.style.border = "";
        warning.style.display = "";
      }
    },
    async register(e) {
      if (
        this.newUser.userID.length > 0 &&
        this.newUser.userName.length > 0 &&
        this.newUser.password.length > 5 &&
        this.newUser.password == this.newUser.confirmPassword
      ) {
        e.preventDefault();
        const newUser = this.newUser;
        await this.$store.dispatch("register", newUser);
        if (
          JSON.parse(sessionStorage.getItem("registerSucceed")) ==
          newUser.userID
        ) {
          this.$router.push({ name: "ConfirmToken" });
        } else {
          const alert = document.querySelector(".error-alert");
          alert.classList.add("show");
          this.alertMessage();
        }
      }
    },
    reVerify(e) {
      e.preventDefault();
      sessionStorage.setItem("reVerify", JSON.stringify(true));
      this.$router.push({ name: "ConfirmToken" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Login/signup.less";
</style>
