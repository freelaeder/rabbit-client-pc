import type { Category } from "@/types/Category ";
import type { Status } from "@/types/Status";
import { CategoryAPI } from "@/api/CategoryAPI";
import { defineStore } from "pinia";
import type { Banner } from "@/types/Banner";
import { HomeAPI } from "@/api/HomeAPI";

//定义Store对象中状态的类型
type State = {
  categories: {
    headerNav: (Category & { isOpen: boolean })[];
    homeCategory: Category[];
    status: Status;
  };
  // 轮播图
  banners: {
    result: Banner[];
    status: Status;
  };
};
//定义Getters 对象的类型
type Getters = {
  // 一级分类面包屑导航
  currentTop: (state: State) => (topCategoryId: string) => Category | undefined;
  // 二级分类 面包屑导航
  currentTopAndSub: (
    state: State
  ) => (
    topCategoryId: string,
    subCategoryId: string
  ) => { topCategory: Category | undefined; subCategory: Category | undefined };
};
//定义Actions 对象的类型
type Actions = {
  getCategories(): Promise<void>;
  toggle(id: string, isOpen: boolean): void;
  getBanners(): Promise<void>;
};
//创建categoryStore 对象，返回用于获取创建categoryStore对象的方法
export const useCategoryStore = defineStore<
  "category",
  State,
  Getters,
  Actions
>("category", {
  state: () => ({
    //用于存储导航分类列表数据
    categories: {
      headerNav: [],
      homeCategory: [],
      status: "idle",
    },
    banners: {
      result: [],
      status: "idle",
    },
  }),
  getters: {
    // 根据一级分类id 获取面包屑导航
    currentTop: (state) => {
      return function (topCategoryId) {
        return state.categories.headerNav.find(
          (item) => item.id === topCategoryId
        );
      };
    },
    // 二级分类 面包屑导航
    currentTopAndSub(state) {
      return function (topCategoryId, subCategoryId) {
        const topCategory = state.categories.headerNav.find(
          (item) => item.id === topCategoryId
        );
        const subCategory = topCategory?.children?.find(
          (item) => item.id === subCategoryId
        );
        return { topCategory, subCategory };
      };
    },
  },
  actions: {
    // 用于获取导航分类列表数据
    async getCategories() {
      // 记录请求状态
      this.categories.status = "loading";
      // 捕获错误
      try {
        // 发送请求 获取分类状态
        let response = await CategoryAPI.getCategories();
        // 存储分类状态
        this.categories.headerNav = response.result.map((category) => ({
          ...category,
          isOpen: false,
        }));
        // 头部首页左侧分类列表
        this.categories.homeCategory = response.result.map((category) => ({
          ...category,
          children: category.children?.slice(0, 2),
        }));
        // 记录请求状态
        this.categories.status = "success";
      } catch (error) {
        // 记录请求状态
        this.categories.status = "error";
      }
    },
    toggle(id, target) {
      //查找目标分类
      const category = this.categories.headerNav.map((item) => {
        if (item.id === id) {
          item.isOpen = target;
        }
      });
    },
    // 获取轮播图
    async getBanners() {
      // 更新状态
      this.banners.status = "loading";
      // 捕获错误
      try {
        // 发送请求
        let response = await HomeAPI.getBanners(2);
        // 存储
        this.banners.result = response.result;
        // 更新状态
        this.banners.status = "success";
      } catch (e) {
        this.banners.status = "error";
      }
    },
  },
});
