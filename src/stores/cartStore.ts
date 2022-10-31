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
  // 用户选择的商品列表
  selectedGoods(): Cart[];
  // 计算用户选择的商品数量
  selectedQuantity(): number;
  // 计算用户选择的商品的价格
  selectedPrice(): number;
  // 无效商品列表
  invalidGoods(): Cart[];
  // 是否已全部选中
  isAllSelected(): boolean;
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
  // 修改商品信息
  alterCartGoods(args: {
    id: string;
    selected?: boolean;
    count?: number;
  }): Promise<Cart>;
  // 全选取消全选
  selecteAndDeselect(seleted: boolean): Promise<void>;
  // 修改商品规格
  alterSku(oldSkuId: string, newSkuId: string): Promise<void>;
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
          (total, item) => (total += parseFloat(item.nowPrice) * item.count),
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
      // 用户选择的商品列表
      selectedGoods() {
        return this.effectiveGoods.filter((item) => item.selected);
      },
      //// 计算用户选择的商品数量
      selectedQuantity() {
        return this.selectedGoods.length;
      },
      // 计算用户选择的商品的价格
      selectedPrice() {
        return this.selectedGoods.reduce(
          (price, item) => (price += parseFloat(item.nowPrice) * item.count),
          0
        );
      },
      //无效商品列表
      invalidGoods() {
        return this.carts.result.filter(
          (item) => !item.isEffective || item.stock === 0
        );
      },
      // 是否全部选中
      isAllSelected() {
        if (this.selectedGoods.length === 0) return false;
        return this.selectedGoods.length === this.effectiveGoods.length;
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
      // 修改商品
      async alterCartGoods(args) {
        const response = await CartAPI.alterCartGoods(args);
        this.getCarts();
        return response.result;
      },
      // 全选
      async selecteAndDeselect(selected) {
        // 发送请求实现全选和取消全选
        await CartAPI.selectAndDeselec(selected);
        // 更新购物车
        this.getCarts();
      },
      // 修改商品规格
      async alterSku(oldSkuId, newSkuId) {
        // 根据旧商品的 skuId 查找旧的商品
        const oldGoods = this.carts.result.find(
          (item) => item.skuId === oldSkuId
        );
        if (typeof oldGoods == "undefined") return;
        // 如果找到了旧的商品
        const goodsCount = oldGoods.count;
        await this.removeGoodsOfCart({ ids: [oldSkuId] });
        // 添加新的商品
        await this.addProductToCart(newSkuId, goodsCount);
      },
    },
  }
);
