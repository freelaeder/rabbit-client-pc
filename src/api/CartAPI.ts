import type { Cart } from "@/types/Cart";
import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class CartAPI {
  // 加入购物车
  static addProductToCart(skuId: string, count: number) {
    return XtxRequestManager.instance.request<XtxResponse<Cart>>({
      url: "/member/cart",
      method: "post",
      data: { skuId, count },
    });
  }
}
