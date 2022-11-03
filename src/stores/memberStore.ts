import { MemberAPI } from "@/api/MemberAPI";
import type { CollectionParams, CollectionResponse } from "@/types/Member";
import type { Pagination } from "@/types/Response";
import type { Status } from "@/types/Status";

type State = {
  // 我的收藏
  collections: {
    [type in 1 | 2 | 3]: {
      result: Partial<Pagination<CollectionResponse>>;
      status: Status;
    };
  };
};
type Getters = {};
type Actions = {
  // 获取我的收藏
  getCollections(params: CollectionParams): Promise<void>;
};

export const useMemberStore = defineStore<"member", State, Getters, Actions>(
  "member",
  {
    state: () => ({
      collections: {
        1: {
          result: {},
          status: "idle",
        },
        2: {
          result: {},
          status: "idle",
        },
        3: {
          result: {},
          status: "idle",
        },
      },
    }),
    actions: {
      // 获取我的收藏
      async getCollections(params) {
        // 更新状态
        this.collections[params.collectType].status = "loading";
        try {
          // 发送请求 获取我的收藏
          const response = await MemberAPI.getCollections(params);
          // 存储我的收藏状态
          this.collections[params.collectType].result = response.result;
          // 更新加载状态
          this.collections[params.collectType].status = "success";
        } catch (error) {
          // 更新加载状态
          this.collections[params.collectType].status = "error";
        }
      },
    },
    getters: {},
  }
);
