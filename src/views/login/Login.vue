<template>
  <div class="login-wrapper">
    <img class="login-logo" src="../../assets/img/login-logo.png" alt="" />
    <div class="login-logo-title">智慧能源</div>
    <div class="login-box">
      <div class="login-box-title">登录</div>
      <div class="login-input">
        <input
          type="text"
          v-model="username"
          class="login-username"
          placeholder="请输入账号"
        />
        <img
          class="login-icon"
          src="../../assets/img/login-username.png"
          alt=""
        />
      </div>
      <div class="login-input">
        <input
          type="password"
          v-model="password"
          class="password"
          placeholder="请输入密码"
        />
        <img
          class="login-icon"
          src="../../assets/img/login-password.png"
          alt=""
        />
      </div>
      <van-button type="primary" block @click="login()">登 录</van-button>
    </div>
    <div class="login-bottom">上海昱章电气成套设备有限公司</div>
  </div>
</template>

<script>
import { Button } from "vant";
import { login } from "@/http/api";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: localStorage.username || "",
      password: ""
    };
  },
  components: {
    [Button.name]: Button
  },
  methods: {
    ...mapMutations(["mutLogin"]),
    login() {
      login({
        username: this.username,
        password: this.$getRsaCode(this.password)
      }).then(data => {
        // let data = res.data;
        if (data.code === 200) {
          let token = data.data.tokenHead + data.data.token;
          this.mutLogin(token);
          sessionStorage.token = token;
          this.$router.push("/map");
          localStorage.username = this.username;
        } else {
          alert("账号或者密码错误！");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-wrapper
  width: 100%
  height: 100%
  background-image: url("../../assets/img/login-bg.jpg")
  background-size: 100% 100%
  position: relative
  padding-top: 10.5vh

  .login-logo
    display: block
    width: 16vw
    margin: 0 auto

  .login-logo-title
    text-align: center
    margin-top: 2vh
    font-size: 1.8rem
    color: #fff
    font-weight: 600

  .login-bottom
    width: 100%
    text-align: center
    position: fixed
    left: 0
    bottom: 5vh
    font-size: 1.4rem
    color: #94A5BB

  .login-box
    width: 87vw
    height: 50vh
    margin: 5vh auto 0 auto
    background: #fff
    border-radius: 0.5rem
    padding: 4.6vh 5vw 8vh 5vw
    display flex
    flex-direction column
    justify-content space-between

    .login-box-title
      font-size: 2.4rem
      color: #3E4A59

    .login-input
      width: 100%
      height: 7.5vh
      position: relative

      input
        width: 100%
        height: 7.5vh
        padding: 0
        padding-left: 13vw
        color: #94A5BB
        font-size: 1.5rem
        border: 0
        border-bottom: 1px solid #E9EEF5

        &::-webkit-input-placeholder
          color: #94A5BB

      .login-icon
        width: 5.3vw
        height: 3vh
        position: absolute
        left: 6vw
        top: 2.25vh

    .van-button
      height: 6.4vh
      background-image: linear-gradient(to right, #44EEE0, #26D4DC)
      border: 0
      color: #FEFEFE
      font-size: 1.8rem
      border-top-left-radius: 2.4rem
      border-top-right-radius: 2.4rem
      border-bottom-left-radius: 2.4rem
      border-bottom-right-radius: 2.4rem
</style>
