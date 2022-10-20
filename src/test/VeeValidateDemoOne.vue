<!-- 表单验证模板 -->
<script lang="ts" setup>
// 字段级验证

function username(value: unknown) {
  if (!value) return "必须输入";
  if (typeof value !== "string") return "必须是字符串";
  if (value.length < 2) return "长度必须大于2";
  return true;
}
// 验证username
const {
  value: usernameField,
  errorMessage: usernameErrer,
  // 设置值
  setValue: setUsernameValue,
  // 恢复默认值
  resetField: resetUsernameValue,
  meta: usernameMeta,
  validate: usernameValidate,
} = useField("username", username, { initialValue: "x" });

// 验证password
const { value: passwordField, errorMessage: passwordError } = useField(
  "password",
  password,
  {
    initialValue: 92312,
  }
);
function password(value: unknown) {
  if (!value) return "输入密码";
  if (typeof value !== "string") return "必须为数字";

  return true;
}
// 设置值
function onSet() {
  setUsernameValue("freelaeder");
}
//恢复默认值
function onResets() {
  resetUsernameValue();
}
//onsubmit
function onSubmit() {
  usernameValidate();
  if (!usernameMeta.valid) return;
  console.log(usernameField.value);
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="container mt-6">
    <div class="field">
      <label class="label">用户名</label>
      <div class="control has-icons-left">
        <input
          v-model="usernameField"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="usernameErrer">{{ usernameErrer }}</p>
    </div>
    <div class="field">
      <label class="label">密码</label>
      <div class="control has-icons-left">
        <input
          v-model="passwordField"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="passwordError">{{ passwordError }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <button @click="onResets" type="button" class="button is-link is-light">
          重置
        </button>
      </div>
      <div class="control">
        <button @click="onSet" type="button" class="button is-link is-light">
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
