<!-- 登录表单组件: src/views/login/components/LoginForm.vue  -->
<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import Message from "@/utils/XtxMessage";

// 是否为账号登录
const accountLogin = ref(true);

// 用户储存 用户信息的 store 对象
const userStore = useUserStore();
//useRouter(); 控制路由跳转
//useRoute() 获取路由细信息
const router = useRouter();
// vue实例对象
const $ = getCurrentInstance();
// 监听登录status
watch(
  () => userStore.profile.status,
  (status) => {
    if (status === "success") {
      Message({
        type: "success",
        msg: "登录成功",
      });
      router.push("/");
    } else if (status === "error") {
      $?.proxy?.$message({ type: "error", msg: userStore.profile.error });
    }
  }
);
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
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
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
