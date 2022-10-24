<!-- 表单验证模板 -->
<script lang="ts" setup>
// 导入
import { Field, ErrorMessage } from "vee-validate";
// https://zod.dev/README_ZH
import * as zod from "zod";
// 导入 转化zod 为validated 使用的方法
import { toFormValidator } from "@vee-validate/zod";

zod.object({
  users: zod.array(
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
  ),
});

// 创建表单验证对象
const { handleSubmit } = useForm({
  initialValues: {
    users: [{ username: "", password: "" }],
  },
});

// 验证通过 处理表单提交
const onSubmit = handleSubmit((values: any) => {
  console.log(values);
});

//创建动态生成表单功能
//fields 表单项对象数组 [{}]
// 数组中有多少对象 就会生成多少组表单项
const { fields, push, remove } = useFieldArray("users");
</script>

<template>
  <form class="container mt-6" @submit="onSubmit">
    <template v-for="(item, index) in fields" :key="item.key">
      <Field
        v-slot="{ field }"
        as="div"
        :name="`users[${index}].username`"
        class="field"
        :validate-on-input="true"
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
        <ErrorMessage :name="`users[${index}].username`" v-slot="{ message }">
          <p class="help is-danger">{{ message }}</p>
        </ErrorMessage>
      </Field>
      <Field
        as="div"
        :name="`users[${index}].password`"
        v-slot="{ field }"
        class="field"
        :validate-on-input="true"
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
        <ErrorMessage :name="`users[${index}].password`" v-slot="{ message }">
          <p class="help is-danger">{{ message }}</p>
        </ErrorMessage>
      </Field>

      <div class="control">
        <button
          @click="remove(index)"
          type="button"
          class="button is-link is-light"
        >
          delete
        </button>
      </div>
    </template>

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <button type="button" class="button is-link is-light">重置</button>
      </div>
      <div class="control">
        <button
          @click="push({ username: '', password: '' })"
          type="button"
          class="button is-link is-light"
        >
          add
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="less" scoped>
@import "https://bulma.io/vendor/fontawesome-free-5.15.2-web/css/all.min.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
