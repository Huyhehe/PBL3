<template>
  <div class="confirm">
    <div class="container">
      <h1 class="title">Nhập mã xác thực</h1>
      <div class="body">
        <form v-if="!registeredSuccessful && !isReVerify">
          <span>Mã xác thực đã được gửi đến email của bạn</span>
          <input type="text" placeholder="Code..." v-model="token" />
          <span @click="resend" id="resend">Gửi lại mã xác thực</span>
          <button @click.prevent="verify">Xác thực</button>
        </form>
        <form v-if="!registeredSuccessful && isReVerify">
          <span>Vui lòng nhập mã nhân viên của bạn</span>
          <input type="text" placeholder="Enter" v-model="userID" />
          <button @click.prevent="resend">Gửi</button>
        </form>
        <form v-if="registeredSuccessful">
          <span>Bạn đã đăng ký thành công!</span>
          <button @click="redirectLogin">Đăng nhập</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      registeredSuccessful: false,
      isReVerify: false,
      userID: "",
    };
  },
  mounted() {
    if (JSON.parse(sessionStorage.getItem("reVerify"))) {
      this.isReVerify = true;
    }
  },
  methods: {
    async resend() {
      let userID = this.userID;
      if (!this.isReVerify) {
        userID = JSON.parse(sessionStorage.getItem("registerSucceed"));
      }
      await this.$store.dispatch("refreshRegisterToken", userID);
      sessionStorage.setItem("reVerify", JSON.stringify(false));
      this.isReVerify = false;
    },
    async verify() {
      const token = this.token;
      console.log(typeof token);
      await this.$store.dispatch("verifyRegister", token);
      this.registeredSuccessful = this.$store.getters.registerSuccess;
    },
    redirectLogin() {
      this.$router.push({ name: "Login" });
    },
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
.confirm {
  height: 100vh;
  background-image: url("~@/assets/image/background.jpg");
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 25%;
    // height: 35vh;
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
