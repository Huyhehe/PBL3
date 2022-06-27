<template>
  <div class="forgot-password">
    <Alert :mess="alertMsg" />
    <div class="container">
      <h1 class="title">Quên mật khẩu</h1>
      <div class="body">
        <form v-if="sendMailSucceed && !resetPasswordSuccessful">
          <span>Mã xác thực đã được gửi đến email của bạn</span>
          <input type="text" placeholder="Code..." v-model="token" />
          <span @click="resend" id="resend">Gửi lại mã xác thực</span>
          <button @click.prevent="verify">Xác thực</button>
        </form>
        <form v-if="!sendMailSucceed && !resetPasswordSuccessful">
          <span>Vui lòng nhập thông tin dưới đây</span>
          <div class="input-wrapper">
            <div class="wrapper-input">
              <input
                type="email"
                class="input"
                required
                name="email"
                placeholder=" "
                v-model="email"
              />
              <label for="email" class="input-labels">Email</label>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="wrapper-input">
              <input
                type="text"
                class="input"
                required
                name="id"
                placeholder=" "
                v-model="newIncoming.userId"
              />
              <label for="id" class="input-labels">Mã nhân viên</label>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="wrapper-input">
              <input
                type="password"
                class="input"
                required
                name="password"
                placeholder=" "
                v-model="newIncoming.password"
              />
              <label for="password" class="input-labels">Mật khẩu mới</label>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="wrapper-input">
              <input
                type="password"
                class="input"
                required
                name="confirmPassword"
                placeholder=" "
                v-model="newIncoming.confirmPassword"
              />
              <label for="confirmPassword" class="input-labels"
                >Xác nhận mật khẩu</label
              >
            </div>
          </div>
          <button @click.prevent="sendMail">Gửi</button>
        </form>
        <form v-if="resetPasswordSuccessful">
          <span>Bạn đã đăng ký thành công!</span>
          <button @click="redirectLogin">Đăng nhập</button>
        </form>
      </div>
    </div>
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
      resetPasswordSuccessful: false,
      email: "",
      newIncoming: {
        userId: "",
        password: "",
        confirmPassword: "",
      },
      alertMsg: "",
      sendMailSucceed: false,
      token: "",
    };
  },
  methods: {
    alertMessage() {
      this.alertMsg = this.$store.getters.getWarningMessage;
      const alertMessage = document.querySelector(".error-alert");
      setTimeout(() => {
        alertMessage.classList.remove("show");
      }, 3000);
    },
    async sendMail() {
      const email = this.email;
      await this.$store.dispatch("forgotPassword", email);
      this.sendMailSucceed = await this.$store.getters.getSendMailState;
      console.log(this.sendMailSucceed);
      if (!this.sendMailSucceed) {
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
      }
    },
    async verify() {
      const token = this.token;
      await this.$store.dispatch("verifyResetPassword", token);
      if (this.$store.getters.getResetPasswordTokenValid) {
        const newIncoming = this.newIncoming;
        await this.$store.dispatch("resetPassword", newIncoming);
        this.resetPasswordSuccessful = await this.$store.getters
          .getResetPasswordSuccessful;
      } else {
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
      }
    },
    redirectLogin() {
      this.$router.push({ name: "Login" });
    },
    resend() {
      const userId = this.newIncoming.userID;
      this.$store.dispatch("refreshResetPasswordToken", userId);
    },
  },
  destroyed() {
    console.log("destroyed");
    this.$store.commit("SET_FORGOT_PASSWORD_SENDMAIL_STATE", "reset");
    this.$store.commit("SET_RESET_PASSWORD_TOKEN", "reset");
    this.$store.commit("SET_RESET_PASSWORD_STATUS", "reset");
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  color: white;
  font-family: "Montserrat", sans-serif;
}
.forgot-password {
  height: 100vh;
  background-image: url("~@/assets/image/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .container {
    width: 25%;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 4em;
    border-radius: 5px;

    .title {
      display: flex;
      justify-content: left;
    }

    .body {
      padding: 2em 0;
      min-height: 30%;

      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .input-wrapper {
          width: 100%;

          position: relative;
          .input {
            width: 100%;
            height: 50px;
            font-size: 16px;
            border: none;
            margin: 1em auto;
            padding: 0 20px;
            box-sizing: border-box;
            border-radius: 4px;
            background-color: #333;
            outline: none;
            &:not(:placeholder-shown) + .input-labels,
            &:focus + .input-labels {
              top: 0;
              transform: translateY(-30%);
            }
          }
          .input-labels {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            user-select: none;
            pointer-events: none;
            color: #999;
            transition: all 0.3s ease;
          }

          //may cause layout breaking if not wrapped
          .wrapper-input {
            position: relative;
            .input {
              width: 100%;
              height: 50px;
              font-size: 16px;
              border: none;
              margin: 1em auto;
              padding: 0 20px;
              box-sizing: border-box;
              border-radius: 4px;
              background-color: #333;
              outline: none;
              &:not(:placeholder-shown) + .input-labels,
              &:focus + .input-labels {
                top: 0;
                transform: translateY(-30%);
              }
            }
            .input-labels {
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
              user-select: none;
              pointer-events: none;
              color: #999;
              transition: all 0.3s ease;
            }
          }
          .wrapper-warning {
            color: #e50914;
            display: none;
          }

          #submit-button {
            background-color: #e50914;
            color: #fff;
            font-weight: 600;
            padding: 0;
            cursor: pointer;
            margin: 30px 0 0 0;
          }
        }

        input {
          width: 100%;
          height: 50px;
          font-size: 16px;
          border: none;
          margin: 0.5em auto;
          padding: 0 20px;
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #333;
          outline: none;
        }

        button {
          width: 100%;
          height: 50px;
          font-size: 16px;
          background-color: #e50914;
          color: #fff;
          font-weight: 600;
          padding: 0;
          cursor: pointer;
          margin: 20px 0 0 0;
          border: none;
          border-radius: 4px;
        }

        span {
          margin-right: auto;
          font-size: 1.2rem;
        }

        #resend {
          font-size: 1rem;
          cursor: pointer;
          text-decoration: underline;
          transition: all 0.3s ease;

          &:hover {
            color: #40a9ff;
          }
        }
      }
    }
  }
}
</style>
