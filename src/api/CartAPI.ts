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
  // 获取购物车列表
  static getCarts() {
    return XtxRequestManager.instance.request<XtxResponse<Cart[]>>({
      url: "/member/cart",
    });
  }
  // 删除商品
  static removeGoodsOfCart(args: {
    ids?: string[];
    clearAll?: boolean;
    clearInvalid?: boolean;
  }) {
    return XtxRequestManager.instance.request<
      XtxResponse<boolean>,
      {
        ids?: string[];
        clearAll?: boolean;
        clearInvalid?: boolean;
      }
    >({
      url: "/member/cart",
      method: "delete",
      data: args,
    });
  }
}
