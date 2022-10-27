import { CartAPI } from "@/api/CartAPI";
import type { Cart } from "@/types/Cart";
import type { Status } from "@/types/Status";
type State = {
  // 购物车列表
  carts: {
    result: Cart[];
    status: Status;
  };
};

type Getters = {
  // 可购买商品列表 (有效商品 + 商品库存数量大于0)
  effectiveGoods(): Cart[];
  // 计算可购买商品数量
  effectiveTotalQuantity(): number;
  // 计算可购买商品总价
  effectiveTotalPrice(): number;
};

type Actions = {
  // 将商品加入购物车
  addProductToCart(skuId: string, count: number): Promise<Cart>;
  // 获取购物车列表
  getCarts(): Promise<void>;
  // 删除商品 方法
  removeGoodsOfCart(args: {
    ids?: string[];
    clearAll?: boolean;
    clearInvalid?: boolean;
  }): Promise<void>;
};

export const useCartStore = defineStore<"cart", State, Getters, Actions>(
  "cart",
  {
    state: () => ({
      // / 购物车列表
      carts: {
        result: [],
        status: "idle",
      },
    }),
    getters: {
      // 可购买商品列表 (有效商品 + 商品库存数量大于0)
      effectiveGoods() {
        return this.carts.result.filter(
          (item) => item.isEffective && item.stock > 0
        );
      },
      // 计算可购买商品总价
      effectiveTotalPrice() {
        return this.effectiveGoods.reduce(
          (total, item) => (total += parseFloat(item.nowPrice)),
          0
        );
      },
      // 计算可购买的商品数量
      effectiveTotalQuantity() {
        return this.effectiveGoods.reduce(
          (total, item) => (total += item.count),
          0
        );
      },
    },
    actions: {
      // 将商品加入购物车
      async addProductToCart(skuId, count) {
        // 发送请求 将商品加入购物车
        const response = await CartAPI.addProductToCart(skuId, count);
        // 重新获取购物车商品列表
        this.getCarts();
        // 返回服务端响应的新加入到购物车的商品
        return response.result;
      },
      // 获取 购物车列表
      async getCarts() {
        // 更新加载状态
        this.carts.status = "loading";
        try {
          // 发送请求获取购物车商品列表
          const response = await CartAPI.getCarts();
          // 存储购物车列表
          this.carts.result = response.result;
          // 更新加载状态
          this.carts.status = "success";
        } catch (error) {
          // 更新加载状态
          this.carts.status = "error";
        }
      },
      // 删除 购物车的商品
      async removeGoodsOfCart(args) {
        // 发送请求删除商品
        const response = await CartAPI.removeGoodsOfCart(args);
        // 删除成功, 有商品被删除
        if (response.result) {
          // 重新获取购物车列表
          this.getCarts();
        } else {
          // 删除成功, 没有商品被删除
          // 比如清空无效商品, 而无效商品的数量为0
          // 请求是发送成功的, 但是并没有删除任何商品
        }
      },
    },
  }
);
