<!-- src/test/VeeValidateDemoTwo.vue -->
<script setup lang="ts">
// 定义表单字段验证规则
const validationSchema = {
  // 验证用户名
  username(value: unknown) {
    if (!value) return "请输入用户名";
    if (typeof value !== "string") return "用户名类型错误";
    if (value.length < 2) return "用户名的长度不能小于2";
    return true;
  },
  // 验证密码
  password(value: unknown) {
    if (!value) return "请输入密码";
    if (typeof value !== "string") return "密码类型错误";
    if (value.length < 6) return "密码的长度不能小于6";
    return true;
  },
};
// 创建表单级验证对象
const { handleSubmit, handleReset, useFieldModel, setFieldValue, errors } =
  useForm<{
    username: string;
    password: string;
  }>({
    validationSchema: validationSchema,
    initialValues: { username: "", password: "" },
    // 此选项目前不生效
    validateOnMount: false,
  });
// 获取表单字段响应式对象
const [username, password] = useFieldModel(["username", "password"]);

// 表单提交
const onSubmit = handleSubmit((value) => {
  console.log(value);
});

// 设置表单值
function onSet() {
  setFieldValue("username", "李四");
  setFieldValue("password", "654321");
}
</script>

<template>
  <form class="container mt-6" @submit="onSubmit">
    <div class="field">
      <label class="label">用户名</label>
      <div class="control has-icons-left">
        <input
          v-model="username"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="errors.username">{{ errors.username }}</p>
    </div>
    <div class="field">
      <label class="label">密码</label>
      <div class="control has-icons-left">
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="errors.password">{{ errors.password }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <button
          @click="handleReset"
          type="button"
          class="button is-link is-light"
        >
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
