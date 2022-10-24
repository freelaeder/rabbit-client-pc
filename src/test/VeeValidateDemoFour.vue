<!-- 表单验证模板 -->
<script lang="ts" setup>
// 使用组件进行表单级别验证

//1 引入
import { Form, Field, ErrorMessage } from "vee-validate";
// 引入 zod
import * as zod from "zod";
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
//提交事件
// 验证通过点击提交就会触发
function onsubmit(values: any) {
  console.log(values);
}
</script>

<template>
  <!-- // 2 包裹组件 -->
  <Form
    v-slot="{ handleSubmit, handleReset }"
    as=""
    :validation-schema="validationSchema"
    :initial-values="{ username: 'fd', password: 'dddddddd' }"
  >
    <form @submit.prevent="handleSubmit(onsubmit)" class="container mt-6">
      <!-- 3 Field 包裹验证项 name 验证方法 v-slot解构  field 绑定值  -->
      <Field name="username" as="div" v-slot="{ field }" class="field">
        <label class="label">用户名</label>
        <div class="control has-icons-left">
          <!-- v-bind 绑定input  -->
          <input
            v-bind="field"
            class="input"
            type="text"
            placeholder="请输入用户名"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <!-- 解构 message v-slot  -->
        <ErrorMessage name="username" v-slot="{ message }">
          <p class="help is-danger">{{ message }}</p>
        </ErrorMessage>
      </Field>
      <Field name="password" as="div" v-slot="{ field }" class="field">
        <label class="label">密码</label>
        <div class="control has-icons-left">
          <input
            v-bind="field"
            class="input"
            type="password"
            placeholder="请输入密码"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
        <ErrorMessage name="password" v-slot="{ message }">
          <p class="help is-danger">{{ message }}</p>
        </ErrorMessage>
      </Field>
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
          <button type="button" class="button is-link is-light">
            设置表单值
          </button>
        </div>
      </div>
    </form>
  </Form>
</template>

<style lang="less" scoped>
@import "https://bulma.io/vendor/fontawesome-free-5.15.2-web/css/all.min.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
