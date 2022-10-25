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
      url: "/register/code",
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
}
