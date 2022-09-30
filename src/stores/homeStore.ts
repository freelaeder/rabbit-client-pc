// src/stores/brandStore.ts
import { HomeAPI } from "@/api/HomeAPI";
import type { Banner } from "@/types/Banner";
import type { Brands } from "@/types/Brands";
import type { Category } from "@/types/Category ";
import type { Goods } from "@/types/Goods";
import type { HotRecommends } from "@/types/hotRecommends";
import type { Special } from "@/types/Special";
import type { Status } from "@/types/Status";

type State = {
  //推荐品牌
  brands: {
    result: Brands[];
    status: Status;
  };
  // 轮播图
  banners: {
    result: Banner[];
    status: Status;
  };
  // 新鲜好物
  freshGoods: {
    result: Goods[];
    status: Status;
  };
  // 人气推荐
  hotRecommends: {
    result: HotRecommends[];
    status: Status;
  };
  // 产品区块
  goods: {
    result: Category[];
    status: Status;
  };
  // 最新专题
  specials: {
    result: Special[];
    status: Status;
  };
};
type Getters = {};
type Actions = {
  //获取品牌
  getBrands(limit?: number): Promise<void>;
  // 获取轮播图
  getBanners(): Promise<void>;
  // 获取新鲜好物
  getFreshGoods(limit?: number): Promise<void>;
  // 获取人气推荐
  getHotRecommends(): Promise<void>;
  // 获取产品区块
  getGoods(): Promise<void>;
  // 获取最新专题
  getSpecial(limit?: number): Promise<void>;
};
export const useHomeStore = defineStore<"home", State, Getters, Actions>(
  "home",
  {
    state: () => ({
      // 用于存储品牌数据
      brands: {
        result: [],
        status: "idle",
      },
      banners: {
        result: [],
        status: "idle",
      },
      freshGoods: {
        result: [],
        status: "idle",
      },
      // 人气推荐
      hotRecommends: {
        result: [],
        status: "idle",
      },
      // 产品区块
      goods: {
        result: [],
        status: "idle",
      },
      // 最新专题
      specials: {
        result: [],
        status: "idle",
      },
    }),
    actions: {
      //获取品牌
      async getBrands(limit = 9) {
        //更新加载状态
        this.brands.status = "loading";
        //捕获错误
        try {
          // 发送请求获取推荐品牌数据
          let response = await HomeAPI.getHotBrands(limit);
          // 存储推荐品牌数据
          this.brands.result = response.result;
          // 更新加载状态
          this.brands.status = "success";
        } catch (e) {
          // 更新加载状态
          this.brands.status = "error";
        }
      },
      // 获取轮播图数据
      async getBanners() {
        // 更新数据加载状态
        this.banners.status = "loading";
        // 捕获错误
        try {
          // 发送请求获取轮播图数据
          let response = await HomeAPI.getBanners(1);
          // 存储轮播图数据
          this.banners.result = response.result;
          // 更新数据加载状态
          this.banners.status = "success";
        } catch (e) {
          // 更新数据加载状态
          this.banners.status = "error";
        }
      },
      // 新鲜好物
      async getFreshGoods(limit = 4) {
        // 更新状态
        this.freshGoods.status = "loading";
        // 捕获错误
        try {
          let response = await HomeAPI.getFreshGoods(limit);
          // 储存
          this.freshGoods.result = response.result;
          // 更新状态
          this.freshGoods.status = "success";
        } catch (err) {
          this.freshGoods.status = "error";
        }
      },
      // 人气推荐
      async getHotRecommends() {
        this.hotRecommends.status = "loading";
        try {
          let response = await HomeAPI.getHotRecommends();
          this.hotRecommends.result = response.result;
          this.hotRecommends.status = "success";
        } catch (err) {
          this.hotRecommends.status = "error";
        }
      },
      // 产品区块
      async getGoods() {
        this.goods.status = "loading";

        try {
          let response = await HomeAPI.getGoods();
          this.goods.result = response.result;
          this.goods.status = "success";
        } catch (e) {
          this.goods.status = "error";
        }
      },
      // 最新专题
      async getSpecial(limit = 3) {
        this.specials.status = "loading";
        // 捕获异常
        try {
          // 发送请求
          let response = await HomeAPI.getSpecial(limit);
          // 保存数据
          this.specials.result = response.result;
          // 更新状态
          this.specials.status = "loading";
        } catch (e) {
          this.specials.status = "error";
        }
      },
    },
  }
);
