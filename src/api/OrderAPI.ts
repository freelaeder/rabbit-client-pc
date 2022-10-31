import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";
import type { OrderOfCreateResponse } from "@/types/Order";
export class OrderAPI {
  // 生成订单
  static createOrder() {
    return XtxRequestManager.instance.request<
      XtxResponse<OrderOfCreateResponse>
    >({
      url: "/member/order/pre",
    });
  }
}
