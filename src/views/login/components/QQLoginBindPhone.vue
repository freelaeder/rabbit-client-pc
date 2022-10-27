<!-- QQ登录: QQ账号绑定已有账号(手机号) src/views/login/components/QQLoginBindPhone.vue -->
<script lang="ts" setup>
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { Field, ErrorMessage } from "vee-validate";
import useCountDown from "@/logics/useCuountDown";
import { AuthAPI } from "@/api/AuthAPI";
import { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";

// 获取 useCountDown
const { isActive, count, start } = useCountDown();
// 获取组件实列
const $ = getCurrentInstance();
// props
const props = defineProps<{ unionId: string }>();
// 用于存储QQ用户信息
const qqUserInfo = reactive({ avatar: "", nickName: "" });
// 获取QQ用户的头像和昵称
window.QC.api("get_user_info").success(function (response: any) {
  console.log(response);
  qqUserInfo.nickName = response.data.nickname;
  qqUserInfo.avatar = response.data.figureurl_1;
});
// 编写表单验证规则
const validator = toFormValidator(
  zod.object({
    mobile: zod
      .string({ required_error: "请输入手机号" })
      .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
    code: zod
      .string({ required_error: "请输入验证码" })
      .regex(/^\d{6}$/, "验证码格式错误"),
  })
);

const { handleSubmit, validateField, values } = useForm({
  validationSchema: validator,
});
// 储存用户信息的userStore
const userStore = useUserStore();

// 表单提交
const onSubmit = handleSubmit((values) => {
  console.log(values);
  // 发送请求绑定已有账号
  userStore.login(() =>
    AuthAPI.loginByBindAccount(values.mobile, values.code, props.unionId)
  );
});

// 发送验证码
async function sendMsgCode() {
  // console.log(await validateField("mobile"));
  let { valid, errors } = await validateField("mobile");
  console.log(valid, errors);
  // 验证未通过
  if (!valid) return;
  //如果正在定时器
  if (isActive.value) return;

  try {
    await AuthAPI.sendMsgCodeOfBindQQ(values.mobile, props.unionId, 1);
    start();
    $?.proxy?.$message({ type: "success", msg: "验证码发送成功" });
  } catch (error) {
    if (error instanceof AxiosError) {
      // 消息提示
      $?.proxy?.$message({ type: "error", msg: error.response?.data.message });
    } else {
      $?.proxy?.$message({ type: "error", msg: "手机验证码发送失败" });
    }
  }
}
</script>

<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="user-info">
      <img :src="qqUserInfo.avatar" alt="" />
      <p>
        Hi, {{ qqUserInfo.nickName }} 欢迎来小兔鲜,
        完成绑定后可以QQ账号一键登录哦~
      </p>
    </div>
    <Field
      :validate-on-input="true"
      name="mobile"
      as="div"
      v-slot="{ field }"
      class="xtx-form-item"
    >
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <ErrorMessage name="mobile" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <Field
      :validate-on-input="true"
      name="code"
      as="div"
      v-slot="{ field }"
      class="xtx-form-item"
    >
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-bind="field"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span @click="sendMsgCode" class="code">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <ErrorMessage name="code" v-slot="{ message }">
        <div class="error">{{ message }}</div>
      </ErrorMessage>
    </Field>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
