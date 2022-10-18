import type { Goods } from "@/types/Goods";
import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class GoodsAPI {
  static getGoodsInfo(id: string) {
    // 根据id 获取商品的详细信息
    return XtxRequestManager.instance.request<XtxResponse<Goods>>({
      url: "/goods",
      data: { id },
    });
  }
  // 获取同类商品
  static getRelevantGoods(arg?: { id?: string; limit?: number }) {
    if (typeof arg !== "undefined" && typeof arg.limit === "undefined") {
      arg.limit = 16;
    } else {
      arg = { limit: 16 };
    }
    return XtxRequestManager.instance.request<
      XtxResponse<Goods[]>,
      { id?: string; limit?: number }
    >({
      url: "/goods/relevant",
      data: arg,
    });
  }
  // 获取热销榜
  static getHotSaleGoods(id: string, type: number, limit: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<Goods[]>,
      {
        id: string;
        type: number;
        limit: number;
      }
    >({
      url: "/goods/hot",
      data: { id, type, limit },
    });
  }
}
