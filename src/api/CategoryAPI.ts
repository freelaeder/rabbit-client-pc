import XtxRequestManager from "@/utils/XtxRequestManager";
import type { XtxResponse } from "@/types/Response";
import type { Category } from "@/types/Category ";
export class CategoryAPI {
    // 获取导航分类数据
    static getCategories() {
      return XtxRequestManager.instance.request<XtxResponse<Category[]>>({
        url: "/home/category/head",
      });
    }
  }