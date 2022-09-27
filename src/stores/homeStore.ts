// src/stores/brandStore.ts
import { HomeAPI } from "@/api/HomeAPI";
import type { Banner } from "@/types/Banner";
import type { Brands } from "@/types/Brands";
import type { Status } from "@/types/Status";

type State = {
    //推荐品牌
    brands:{
        result:Brands[];
        status:Status;
    }
    // 轮播图
  banners: {
    result: Banner[];
    status: Status;
  };
}
type Getters={};
type Actions={
   //获取品牌
   getBrands(limit?:number): Promise<void>;
  // 获取轮播图
  getBanners(): Promise<void>;
}
export const useHomeStore = defineStore<"home", State, Getters, Actions>("home", {
    state: ()=>({
        // 用于存储品牌数据
        brands: {
            result: [],
            status:"idle" ,
          },
          banners: {
            result:[],
            status: "idle",
          }
    }),
    actions:{
          //获取品牌
          async getBrands(limit = 9){
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
      async getBanners(){
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
      }
    },
    
   })



