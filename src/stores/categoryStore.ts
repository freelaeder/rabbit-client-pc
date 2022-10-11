import type { Category } from "@/types/Category ";
import type { Status } from "@/types/Status";
import { CategoryAPI } from "@/api/CategoryAPI";
import { defineStore } from "pinia";
import type { Banner } from "@/types/Banner";
import { HomeAPI } from "@/api/HomeAPI";
import type { Pagination } from "@/types/Response";
import type { Goods, GoodsRequestParams } from "@/types/Goods";

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
  // 一级分类具体信息
  topCategories: {
    result: {
      [id: string]: Category;
    };
    status: Status;
  };
  //  二级分类 筛选条件
  subCategoryFilters: {
    result: {
      [id: string]: Category;
    };
    status: Status;
  };
  // 二级分类商品
  categoryGoods: {
    status: Status;
    result: Pagination<Goods>;
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
  // 根据一级分类 id 获取分类信息
  getTopCategoryById(id: string): Promise<void>;
  // 根据二级分类 id 获取该分类下的商品的筛选条件
  getSubCategoryFilters(id: string): Promise<void>;
  // 获取二级分类商品
  getCategoryGoods(
    categoryId: GoodsRequestParams["categoryId"],
    reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>
  ): Promise<void>;
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
    // 一级分类信息
    topCategories: {
      result: {},
      status: "idle",
    },
    // 筛选条件
    subCategoryFilters: {
      result: {},
      status: "idle",
    },
    // 二级分类商品
    categoryGoods: {
      result: {
        page: 0,
        pages: 0,
        pageSize: 0,
        counts: 0,
        items: [],
      },
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
    // 根据一级分类 id 获取分类信息
    async getTopCategoryById(id) {
      // 更新加载状态
      this.topCategories.status = "loading";
      // 捕获错误
      try {
        // 发送请求根据一级分类 id 获取分类信息
        let response = await CategoryAPI.getTopCategoryById(id);
        // 存储一级分类信息
        this.topCategories.result[response.result.id] = response.result;
        // 更新加载状态
        this.topCategories.status = "success";
      } catch (e) {
        // 更新加载状态
        this.topCategories.status = "error";
      }
    },
    // 二级分类筛选条件
    async getSubCategoryFilters(id) {
      this.subCategoryFilters.status = "loading";
      try {
        // 发送请求
        let response = await CategoryAPI.getSubCategoryFilters(id);
        // 存储
        this.subCategoryFilters.result[response.result.id] = response.result;
        // 更新状态
        this.subCategoryFilters.status = "success";
      } catch (e) {
        this.subCategoryFilters.status = "error";
      }
    },
    // 获取二级分类商品
    async getCategoryGoods(categoryId, reqParams) {
      // 数据加载完毕 不在加载
      if (this.categoryGoods.status === "finished") return;

      //更新加载状态
      this.categoryGoods.status = "loading";
      // 捕获错误
      try {
        // 发送请求
        let response = await CategoryAPI.getCategoryGoods(
          categoryId,
          reqParams
        );
        // 保存
        // this.categoryGoods.result = response.result;
        if (reqParams?.page === 1) {
          //  初次保存
          this.categoryGoods.result = response.result;
        } else {
          // 累计状态
          this.categoryGoods.result = {
            ...response.result,
            items: [
              ...this.categoryGoods.result.items,
              ...response.result.items,
            ],
          };
        }
        // 判断是不是最后一页
        if (
          reqParams?.page === response.result.page ||
          response.result.pages === 0
        ) {
          // 更新加载状态
          this.categoryGoods.status = "finished";
        } else {
          this.categoryGoods.status = "success";
        }

        // 更新状态
        // this.categoryGoods.status = "success";
      } catch (e) {
        this.categoryGoods.status = "error";
      }
    },
  },
});
