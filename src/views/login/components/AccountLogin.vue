<!-- 账户登录: src/views/login/components/AccountLogin.vue -->
<template>
  <form>
    <div class="form-item">
      <div class="input">
        <i class="iconfont icon-user"></i>
        <input type="text" placeholder="请输入用户名" />
      </div>
      <div class="error">
        <i class="iconfont icon-warning"></i>
      </div>
    </div>
    <div class="form-item">
      <div class="input">
        <i class="iconfont icon-lock"></i>
        <input autocomplete="on" type="password" placeholder="请输入密码" />
      </div>
      <div class="error">
        <i class="iconfont icon-warning"></i>
      </div>
    </div>
    <div class="form-item">
      <div class="agree">
        <XtxCheckbox />
        <span>我已同意</span>
        <a href="javascript:">《隐私条款》</a>
        <span>和</span>
        <a href="javascript:">《服务条款》</a>
      </div>
      <div class="error">
        <i class="iconfont icon-warning"></i>
      </div>
    </div>
    <button type="submit" class="btn">登录</button>
  </form>
</template>
