<!-- 登录表单组件: src/views/login/components/LoginForm.vue  -->
<script setup lang="ts">
// 是否为账号登录
const accountLogin = ref(true);
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <button v-if="!accountLogin" @click="accountLogin = true">
        <i class="iconfont icon-user"></i>
        使用账号登录
      </button>
      <button v-else @click="accountLogin = false">
        <i class="iconfont icon-msg"></i>
        使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <AccountLogin v-if="accountLogin" />
      <!-- 短信登录 -->
      <MessageLogin v-else />
    </div>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;
      i {
        font-size: 14px;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
