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
}
