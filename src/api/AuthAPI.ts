import type { XtxResponse } from "@/types/Response";
import type { User } from "@/types/User";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class AuthAPI {
  // 用户登录
  static loginByAccount(account: string, password: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      { account: string; password: string }
    >({
      url: "/login",
      method: "post",
      data: {
        account,
        password,
      },
    });
  }
  //发送验证码 实现手机号登录
  static sendMsgCodeOfMobileLogin(mobile: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<null>,
      { mobile: string }
    >({
      url: "/login/code",
      data: { mobile },
    });
  }
  // 手机验证码登录
  static loginByMobileMsgCode(mobile: string, code: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      { mobile: string; code: string }
    >({
      url: "/login/code",
      method: "post",
      data: { mobile, code },
    });
  }
  //QQ登录: 检索用户使用的QQ号是否已绑定本站账号
  static loginByQQOpenid(unionId: string, source: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      {
        unionId: string;
        source: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      }
    >({
      url: "/login/social",
      method: "post",
      data: { unionId, source },
    });
  }
  //发送短信验证码(绑定已有账号)
  static sendMsgCodeOfBindQQ(mobile: string, unionId: string, source: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<null>,
      {
        mobile: string;
        unionId: string;
        source: number;
      }
    >({
      url: "/login/social/code",
      method: "get",
      data: { mobile, unionId, source },
    });
  }
  // QQ登录: 绑定站点已有账号
  static loginByBindAccount(mobile: string, code: string, unionId: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      {
        mobile: string;
        code: string;
        unionId: string;
      }
    >({
      url: "/login/social/bind",
      method: "post",
      data: { mobile, code, unionId },
    });
  }
  //验证用户名是否唯一 valid: true 表示用户名已存在'
  static checkAccountUnique(account: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<{ valid: boolean }>,
      {
        account: string;
      }
    >({
      url: "/register/check",
      data: { account },
    });
  }
  // // 发送短信验证码(绑定新注册账号)
  static sendMsgCodeOfRegister(mobile: string) {
    return XtxRequestManager.instance.request<
      XtxResponse<null>,
      {
        mobile: string;
      }
    >({
      url: "/register/code",
      data: { mobile },
    });
  }
  //QQ登录: 绑定新注册账号
  static loginByBindNewAccount(
    unionId: string,
    user: { account: string; password: string; mobile: string; code: string }
  ) {
    return XtxRequestManager.instance.request<
      XtxResponse<User>,
      { account: string; password: string; mobile: string; code: string }
    >({
      url: `/login/social/${unionId}/complement`,
      method: "post",
      data: user,
    });
  }
}
