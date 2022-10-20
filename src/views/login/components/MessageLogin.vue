<!-- src/views/login/components/MessageLogin.vue -->
<template>
  <form>
    <div class="form-item">
      <div class="input">
        <i class="iconfont icon-user"></i>
        <input type="text" placeholder="请输入手机号" />
      </div>
      <div class="error">
        <i class="iconfont icon-warning"></i>
      </div>
    </div>
    <div class="form-item">
      <div class="input">
        <i class="iconfont icon-code"></i>
        <input type="password" placeholder="请输入验证码" />
        <span class="code">发送验证码</span>
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
