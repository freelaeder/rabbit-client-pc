import { GoodsAPI } from "@/api/GoodsAPI";
import type {
  Evaluate,
  EvaluateRequestParams,
  Goods,
  GoodsDetailInfo,
} from "@/types/Goods";
import type { Status } from "@/types/Status";
import type { EvaluateInfo } from "@/types/Goods";
// import { result } from "lodash";
import chunk from "lodash/chunk";
import type { Pagination } from "@/types/Response";
type States = {
  // 商品信息
  goodsInfo: {
    status: Status;
    result: Goods;
  };
  //同类商品
  releavntGoods: {
    status: Status;
    result: Goods[][];
  };
  // 榜单
  hotSaleGoods: {
    // 加载状态
    status: Status;
    // 榜单数据
    result: {
      // 24小时榜
      1: Goods[];
      // 周榜
      2: Goods[];
      // 总榜
      3: Goods[];
    };
  };
  // 评价头部数据
  evaluateInfo: {
    result: EvaluateInfo;
    status: Status;
  };
  // 评价列表
  evaluateList: {
    result: Pagination<Evaluate>;
    status: Status;
  };
};
export interface Data {
  price: string;
  oldPrice: string;
  inventory: number;
  skuId: string;
}
type Getters = {
  // 获取商品图片
  mainPictures(): string[];
  // 获取商品基本信息
  baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
  // 获取商品详情信息
  goodsProperties(): GoodsDetailInfo;
};

type Actions = {
  // 根据商品id获取商品信息
  getGoodsInfo(id: string): Promise<void>;
  // 更新商品信息 规格更新
  updateGoods(data: Data): void;
  // 获取同类商品
  getReleavntGoods(arg?: { id?: string; limit?: number }): Promise<void>;
  // 获取榜单
  getHotSaleGoods(id: string, type: 1 | 2 | 3, limit: number): Promise<void>;
  // 获取评价头部信息
  getEvaluateInfo(id: string): Promise<void>;
  // 获取商品评价列表
  getEvaluateList(id: string, reqParams: EvaluateRequestParams): Promise<void>;
};

export const useGoodsStore = defineStore<"Goods", States, Getters, Actions>(
  "Goods",
  {
    state: () => ({
      // 商品信息
      goodsInfo: {
        status: "idle",
        result: {
          id: "",
          name: "",
          desc: "",
          price: "",
          picture: "",
          discount: null,
          orderNum: null,
          spuCode: "",
          oldPrice: "",
          inventory: 0,
          brand: [],
          salesCount: 0,
          commentCount: 0,
          collectCount: 0,
          mainVideos: [],
          videoScale: 0,
          mainPictures: [],
          specs: [],
          skus: [],
          categories: [],
          details: {
            pictures: [],
            properties: [],
          },
          isPreSale: false,
          isCollect: false,
          userAddresses: null,
          similarProducts: [],
          hotByDay: [],
          evaluationInfo: null,
        },
      },
      // 同类商品
      releavntGoods: {
        status: "idle",
        result: [],
      },
      // 榜单
      hotSaleGoods: {
        status: "idle",
        result: {
          // 24
          1: [],
          // 周
          2: [],
          // 总
          3: [],
        },
      },
      // 商品评价信息
      evaluateInfo: {
        result: {
          salesCount: 0,
          praisePercent: "",
          evaluateCount: 0,
          hasPictureCount: 0,
          tags: [],
        },
        status: "idle",
      },
      // 商品评价列表
      evaluateList: {
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
      // 获取商品图片
      mainPictures() {
        return this.goodsInfo.result.mainPictures;
      },
      // 获取商品基本信息
      baseInfo() {
        const { name, desc, price, oldPrice } = this.goodsInfo.result;
        return {
          name,
          desc,
          price,
          oldPrice,
        };
      },
      // 获取商品详情信息
      goodsProperties() {
        return {
          // 商品详情图片集合
          pictures: this.goodsInfo.result.details.pictures,
          // 商品属性集合
          properties: this.goodsInfo.result.details.properties,
        };
      },
      // 商品评价列表
    },
    actions: {
      // 根据商品id获取商品信息
      async getGoodsInfo(id) {
        // 更新加载状态
        this.goodsInfo.status = "loading";
        // 捕获错误
        try {
          // 发送请求, 根据商品 id 获取商品详细信息
          let response = await GoodsAPI.getGoodsInfo(id);
          // 存储商品详细信息
          this.goodsInfo.result = response.result;
          // 更新加载状态
          this.goodsInfo.status = "success";
        } catch (e) {
          // 更新加载状态
          this.goodsInfo.status = "error";
        }
      },
      // 更新商品信息 规格更新
      updateGoods(data) {
        this.goodsInfo.result.price = data.price;
        this.goodsInfo.result.oldPrice = data.oldPrice;
        this.goodsInfo.result.inventory = data.inventory;
      },
      // 获取同类商品
      async getReleavntGoods(arg) {
        this.releavntGoods.status = "loading";
        try {
          // 发送请求
          let response = await GoodsAPI.getRelevantGoods(arg);
          // 分割数据
          this.releavntGoods.result = chunk(response.result, 4);
          //
          this.releavntGoods.status = "success";
        } catch (e) {
          this.releavntGoods.status = "error";
        }
      },
      // 获取榜单
      async getHotSaleGoods(id, type, limit) {
        this.hotSaleGoods.status = "loading";
        try {
          let response = await GoodsAPI.getHotSaleGoods(id, type, limit);
          this.hotSaleGoods.result[type] = response.result;
          this.hotSaleGoods.status = "success";
        } catch (error) {
          this.hotSaleGoods.status = "error";
        }
      },
      // 评价信息头部
      async getEvaluateInfo(id) {
        // 更新加载状态
        this.evaluateInfo.status = "loading";
        try {
          // 发送请求获取评价头部信息
          let response = await GoodsAPI.getEvaluateInfo(id);
          // 存储评价头部信息
          this.evaluateInfo.result = response.result;
          // 更新加载状态
          this.evaluateInfo.status = "success";
        } catch (error) {
          this.evaluateInfo.status = "error";
        }
      },
      // 商品评价列表
      async getEvaluateList(id, reqParams) {
        this.evaluateList.status = "loading";
        try {
          // 发送请求
          let response = await GoodsAPI.getEvaluateList(id, reqParams);
          // 保存数据
          this.evaluateList.result = response.result;
          this.evaluateList.status = "success";
        } catch (error) {
          this.evaluateInfo.status = "error";
        }
      },
    },
  }
);
