<template>
  <div class="sign-up">
    <div class="signUp-container">
      <h1 class="signUp-title">Đăng ký</h1>
      <div class="signUp-body">
        <form>
          <div class="signUp-inputs-wrapper">
            <input
              type="email"
              class="signUp-inputs"
              required
              name="account"
              placeholder=" "
            />
            <label for="account" class="signUp-inputs-labels">Tài khoản</label>
          </div>
          <div class="signUp-inputs-wrapper">
            <input
              type="password"
              class="signUp-inputs"
              required
              placeholder=" "
            />
            <label for="password" class="signUp-inputs-labels">Mật khẩu</label>
          </div>
          <div class="signUp-inputs-wrapper">
            <input
              type="password"
              class="signUp-inputs"
              required
              placeholder=" "
            />
            <label for="confirmPassword" class="signUp-inputs-labels"
              >Nhập lại mật khẩu</label
            >
          </div>
          <div class="signUp-inputs-wrapper">
            <input
              type="submit"
              value="Đăng ký"
              class="signUp-inputs"
              id="submit-button"
            />
          </div>
        </form>
      </div>
      <div class="sign-in">
        <form>
          <label>Đã có tài khoản?</label>
          <router-link to="/login">Đăng nhập</router-link>
        </form>
      </div>
      <div class="signUp-extra-content"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Login/signup.less";
</style>
