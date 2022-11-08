import type { Pagination, XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";
import type {
  Address,
  EditAddressObject,
  LogisticsResponse,
  OrderOfCreateResponse,
  OrderResponse,
  OrderState,
  SubmitOrderObject,
  SubmitOrderResponse,
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
  // 修改收货地址
  static updateAddress(id: string, address: EditAddressObject) {
    return XtxRequestManager.instance.request<
      XtxResponse<{ id: string }>,
      EditAddressObject
    >({
      url: `/member/address/${id}`,
      method: "put",
      data: address,
    });
  }
  // 获取订单详情
  static getOrderInfoById(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<OrderResponse>>({
      url: `/member/order/${id}`,
    });
  }
  // 提交订单
  static submitOrder(order: SubmitOrderObject) {
    return XtxRequestManager.instance.request<
      XtxResponse<SubmitOrderResponse>,
      SubmitOrderObject
    >({
      url: "/member/order",
      method: "post",
      data: order,
    });
  }
  // 获取我的订单
  static getMyOrders(page: number, pageSize: number, orderState: OrderState) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<OrderResponse>>
    >({
      url: "/member/order",
      data: { page, pageSize, orderState },
    });
  }
  // 取消订单
  static cancelOrder(id: string, cancelReason: string) {
    return XtxRequestManager.instance.request<XtxResponse<OrderResponse>>({
      url: `/member/order/${id}/cancel`,
      method: "put",
      data: {
        cancelReason,
      },
    });
  }
  // 删除订单
  static removeOrder(ids: string[]) {
    return XtxRequestManager.instance.request<XtxResponse<null>>({
      url: "/member/order",
      method: "delete",
      data: { ids },
    });
  }
  // 确定收货
  static confirmReceiptGoods(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<OrderResponse>>({
      url: `/member/order/${id}/receipt`,
      method: "put",
    });
  }
  // 查看物流
  static viewLogistics(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<LogisticsResponse>>({
      url: `/member/order/${id}/logistics`,
    });
  }
}
