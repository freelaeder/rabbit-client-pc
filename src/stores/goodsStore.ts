import { GoodsAPI } from "@/api/GoodsAPI";
import type { Goods } from "@/types/Goods";
import type { Status } from "@/types/Status";

type States = {
  // 商品信息
  goodsInfo: {
    status: Status;
    result: Goods;
  };
};

type Getters = {
  // 获取商品图片
  mainPictures(): string[];
  // 获取商品基本信息
  baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
};

type Actions = {
  // 根据商品id获取商品信息
  getGoodsInfo(id: string): Promise<void>;
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
    },
  }
);
