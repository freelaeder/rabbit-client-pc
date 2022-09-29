import type { Banner } from "@/types/Banner";
import type { Brands } from "@/types/Brands";
import type { Goods } from "@/types/Goods";
import type { HotRecommends } from "@/types/hotRecommends";
import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class HomeAPI {
  static getHotBrands(limit: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<Brands[]>,
      { limit: number }
    >({
      url: "/home/brand",
      data: { limit },
    });
  }
  // 轮播图
  // 广告区域展示位置(1为首页, 2为分类商品页)
  static getBanners(distributionSite: 1 | 2) {
    return XtxRequestManager.instance.request<
      XtxResponse<Banner[]>,
      { distributionSite: 1 | 2 }
    >({ url: "/home/banner", data: { distributionSite } });
  }
  static getFreshGoods(limit: number) {
    return XtxRequestManager.instance.request<
      XtxResponse<Goods[]>,
      { limit: number }
    >({
      url: "/home/new",
      data: { limit },
    });
  }
  //人气推荐
  static getHotRecommends() {
    return XtxRequestManager.instance.request<XtxResponse<HotRecommends[]>>({
      url: "/home/hot",
    });
  }
}
