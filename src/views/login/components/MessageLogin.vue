<!-- src/views/login/components/MessageLogin.vue -->

<script lang="ts" setup>
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { Field, ErrorMessage } from "vee-validate";

const validator = toFormValidator(
  zod.object({
    mobile: zod
      .string({ required_error: "请输入手机号" })
      .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
    code: zod
      .string({ required_error: "请输入验证码" })
      .regex(/^\d{6}$/, "验证码格式错误"),
    isAgree: zod.literal(true, {
      errorMap: () => ({ message: "请勾选同意用户协议" }),
    }),
  })
);
// 创建表单验证对象
const { handleSubmit, values, setFieldValue, validateField } = useForm({
  validationSchema: validator,
});

// 通过验证
const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>
<template>
  <form @submit="onSubmit">
    <Field
      :validate-on-input="true"
      name="mobile"
      as="div"
      v-slot="field"
      class="form-item"
    >
      <div class="input">
        <i class="iconfont icon-user"></i>
        <input v-bind="field" type="text" placeholder="请输入手机号" />
      </div>
      <ErrorMessage name="mobile" v-slot="{ message }">
        <div class="error">
          <i class="iconfont icon-warning">{{ message }}</i>
        </div>
      </ErrorMessage>
    </Field>

    <Field
      :validate-on-input="true"
      name="code"
      as="div"
      v-slot="field"
      class="form-item"
    >
      <div class="input">
        <i class="iconfont icon-code"></i>
        <input v-bind="field" type="password" placeholder="请输入验证码" />
        <span class="code">发送验证码</span>
      </div>
      <ErrorMessage name="code" v-slot="{ message }">
        <div class="error">
          <i class="iconfont icon-warning">{{ message }}</i>
        </div>
      </ErrorMessage>
    </Field>

    <Field name="isAgree" as="div" class="form-item">
      <div class="agree">
        <XtxCheckbox
          :checked="values.isAgree"
          @on-changed="
            setFieldValue('isAgree', $event);
            validateField('isAgree');
          "
        />
        <span>我已同意</span>
        <a href="javascript:">《隐私条款》</a>
        <span>和</span>
        <a href="javascript:">《服务条款》</a>
      </div>
      <ErrorMessage name="isAgree" v-slot="{ message }">
        <div class="error">
          <i class="iconfont icon-warning"></i>
          {{ message }}
        </div>
      </ErrorMessage>
    </Field>
    <button type="submit" class="btn">登录</button>
  </form>
</template>
