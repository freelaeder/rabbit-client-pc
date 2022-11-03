import type { CollectionParams, CollectionResponse } from "@/types/Member";
import type { Pagination, XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class MemberAPI {
  // 获取我的收藏列表
  static getCollections(params: CollectionParams) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<CollectionResponse>>,
      CollectionParams
    >({
      url: "/member/collect",
      data: params,
    });
  }
}
