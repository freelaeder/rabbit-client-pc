import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";
import type {
  Address,
  EditAddressObject,
  OrderOfCreateResponse,
} from "@/types/Order";
export class OrderAPI {
  // 生成订单
  static createOrder() {
    return XtxRequestManager.instance.request<
      XtxResponse<OrderOfCreateResponse>
    >({
      url: "/member/order/pre",
    });
  }
  // 添加地址
  static addAddress(address: EditAddressObject) {
    return XtxRequestManager.instance.request<
      XtxResponse<{ id: string }>,
      EditAddressObject
    >({
      url: "/member/address",
      method: "post",
      data: address,
    });
  }
  // 获取收货地址列表
  static getAddress() {
    return XtxRequestManager.instance.request<XtxResponse<Address[]>>({
      url: "/member/address",
    });
  }
}
