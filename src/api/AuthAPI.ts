import type { XtxResponse } from "@/types/Response";
import type { User } from "@/types/User";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class AuthAPI {
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
}
