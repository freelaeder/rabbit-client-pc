import { defineStore } from "pinia";
import type { User } from "@/types/User";
import type { Status } from "@/types/Status";
import type { XtxResponse } from "@/types/Response";
import { AxiosError } from "axios";

type State = {
  profile: {
    result: Partial<User>;
    status: Status;
    // 登录失败信息
    error: string;
  };
};

type Getters = {};

type Actions = {
  // 登录
  login(callback: () => Promise<XtxResponse<User>>): Promise<void>;
};

export const useUserStore = defineStore<"user", State, Getters, Actions>(
  "user",
  {
    state: () => ({
      // 用户信息
      profile: {
        result: {},
        status: "idle",
        error: "",
      },
    }),
    persist: true,
    getters: {},
    actions: {
      // 用户登录
      async login(callback) {
        this.profile.status = "loading";
        //重置上一次 错误信息
        this.profile.error = "";
        try {
          // 服务端响应的状态类型
          let response = await callback();
          // 存储用户信息
          this.profile.result = response.result;
          // 更新加载状态
          this.profile.status = "success";
        } catch (error) {
          this.profile.status = "error";
          // 存储错误信息
          if (error instanceof AxiosError) {
            this.profile.error = error.response?.data.message;
          } else if (error instanceof Error) {
            this.profile.error = error.message;
          }
        }
      },
    },
  }
);
