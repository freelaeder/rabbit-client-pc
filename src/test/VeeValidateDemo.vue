<!-- 表单验证模板 -->
<script lang="ts" setup>
// 导入
</script>

<template>
  <form class="container mt-6">
    <div class="field">
      <label class="label">用户名</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="请输入用户名" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p class="help is-danger">用户名不合法</p>
    </div>
    <div class="field">
      <label class="label">密码</label>
      <div class="control has-icons-left">
        <input class="input" type="password" placeholder="请输入密码" />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p class="help is-danger">密码不合法</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <button type="button" class="button is-link is-light">重置</button>
      </div>
      <div class="control">
        <button type="button" class="button is-link is-light">
          设置表单值
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="less" scoped>
@import "https://bulma.io/vendor/fontawesome-free-5.15.2-web/css/all.min.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
