<!-- 表单验证模板 -->
<script lang="ts" setup>
// 导入
// https://zod.dev/README_ZH
import * as zod from "zod";
// 导入 转化zod 为validated 使用的方法
import { toFormValidator } from "@vee-validate/zod";
// 绑定字段 使用组件的方式
import { Field, ErrorMessage } from "vee-validate";
// zod.string 表示的是 username 属性对应的值 必须是字符串 类型而且必填
// required_error 当属性没有属性值的时候显示的错误信息
// invalid_type_error 属性类型不匹配 显示
// const usernameValidated = zod.object({
//   username: zod
//     .string({
//       required_error: "请输入username o",
//       invalid_type_error: "username type must is string",
//     })
//     .min(2, { message: "不能小于 2" })
//     .max(6, { message: "用户名不能大于6" }),
// });

// try {
//   usernameValidated.parse({ username: "333" });
//   console.log("ko");
// } catch (error) {
//   console.log(error);
// }

// 使用 toFormValidator
const formValidator = toFormValidator(
  zod.object({
    username: zod
      .string({
        required_error: "请输入username o",
        invalid_type_error: "username type must is string",
      })
      .min(2, { message: "不能小于 2" })
      .max(6, { message: "用户名不能大于6" }),
    // 添加密码验证
    password: zod
      .string({
        required_error: "请输入密码",
        invalid_type_error: "密码类型错误",
      })
      .regex(/^\w{6,24}$/, "密码是6-24个字符"),
  })
);

const { handleSubmit, handleReset } = useForm({
  validationSchema: formValidator,
  initialValues: { username: "ff", password: "d" },
});
const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <form class="container mt-6" @submit="onSubmit">
    <!-- 添加实时验证 :validate-on-input="true" -->
    <!-- name="username" 绑定要验证的值  
       v-slot="{ field }" 解构供input 绑定值   -->
    <Field
      :validate-on-input="true"
      name="username"
      as="div"
      v-slot="{ field }"
      class="field"
    >
      <label class="label">用户名</label>
      <div class="control has-icons-left">
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
      <ErrorMessage name="username" v-slot="{ message }">
        <p class="help is-danger">{{ message }}</p>
      </ErrorMessage>
    </Field>
    <Field
      name="password"
      as="div"
      :validate-on-input="true"
      v-slot="{ field }"
      class="field"
    >
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
</template>

<style lang="less" scoped>
@import "https://bulma.io/vendor/fontawesome-free-5.15.2-web/css/all.min.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
