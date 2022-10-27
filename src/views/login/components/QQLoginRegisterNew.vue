<!-- QQ登录: 注册新账号, 使用新账号绑定QQ号 src/views/login/components/QQLoginRegisterNew.vue -->
<script lang="ts" setup>
import * as zod from "zod";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { AuthAPI } from "@/api/AuthAPI";
import useCountDown from "@/logics/useCuountDown";
import { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";

// props
const props = defineProps<{ unionId: string }>();
// 组件实列对象
const $ = getCurrentInstance();
const { isActive, start, count } = useCountDown();
// 验证规则
const validator = toFormValidator(
  zod
    .object({
      account: zod
        .string({ required_error: "输入用户名" })
        .regex(/^[a-zA-Z]\w{5,19}$/, "字母开头且6-20个字符"),
      mobile: zod
        .string({ required_error: "输入手机号" })
        .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
      code: zod
        .string({ required_error: "请输入验证码" })
        .regex(/^\d{6}$/, "验证码格式错误"),
      password: zod
        .string({ required_error: "请输入密码" })
        .regex(/^\w{6,24}$/, "密码是6-24个字符"),
      confirm: zod.string({ required_error: "请再次输入密码" }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "两次密码输入不一致",
      path: ["confirm"],
    })
);

// 表单验证对象
const { handleSubmit, validateField, setFieldError, values } = useForm({
  // 验证规则
  validationSchema: validator,
  // 初始化
  initialValues: {
    account: "",
    mobile: "",
    code: "",
    password: "",
    confirm: "",
  },
});
// 验证用户名是否唯一
const checkAccountUnique = zod.string().refine(
  async (account) => {
    const response = await AuthAPI.checkAccountUnique(account);
    // valid: true 用户名已存在
    // valid: false 用户名可以注册
    // 对于当前的验证函数来说 返回 true 才表示验证通过, 正好和服务端的响应是相反的
    // 所以返回一个取反的值
    return !response.result.valid;
  },
  {
    message: "用户名已存在",
  }
);
const userStore = useUserStore();

// 验证通过
const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    // 检测用户名是否唯一
    await checkAccountUnique.parseAsync(values.account);
  } catch (error) {
    // 如果验证类型的错误
    if (error instanceof zod.ZodError) {
      setFieldError("account", error.errors[0].message);
    }
    return;
  }
  userStore.login(() => AuthAPI.loginByBindNewAccount(props.unionId, values));
});

// 发送验证码
async function sendMsgCode() {
  // 如果正在定时器
  if (isActive.value) return;
  // 检测用户是否填写 手机号
  let { valid } = await validateField("mobile");
  // 通过返回 true
  if (!valid) return;
  try {
    // 发送手机验证码
    await AuthAPI.sendMsgCodeOfRegister(values.mobile);
    // 消息提示
    $?.proxy?.$message({ type: "success", msg: "手机验证码发送成功" });
    // 开始倒计时
    start();
  } catch (error) {
    if (error instanceof AxiosError) {
      $?.proxy?.$message({ type: "error", msg: error.response?.data.message });
    } else {
      // 消息提示
      $?.proxy?.$message({ type: "error", msg: "手机验证码发送失败" });
    }
  }
}
</script>
<template>
  <form class="xtx-form" @submit="onSubmit">
    <Field name="account" as="div" v-slot="{ field }" class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <ErrorMessage name="account" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <Field name="mobile" as="div" v-slot="{ field }" class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <ErrorMessage name="mobile" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <Field name="code" as="div" v-slot="{ field }" class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span @click="sendMsgCode" class="code">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <ErrorMessage name="code" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <Field name="password" as="div" v-slot="{ field }" class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-bind="field"
          class="input"
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
        />
      </div>
      <ErrorMessage name="password" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <Field name="confirm" as="div" v-slot="{ field }" class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-bind="field"
          class="input"
          type="password"
          placeholder="请确认密码"
          autocomplete="on"
        />
      </div>
      <ErrorMessage name="confirm" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
