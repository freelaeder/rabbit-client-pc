import { OrderAPI } from "@/api/OrderAPI";
import type { OrderOfCreateResponse } from "@/types/Order";
import type { Status } from "@/types/Status";

type State = {
  // 创建临时的订单信息
  orderOfCreate: {
    result: OrderOfCreateResponse;
    status: Status;
  };
};

type Getters = {};
type Actions = {
  //创建订单
  createOrder(): Promise<void>;
};

export const useOrderStore = defineStore<"order", State, Getters, Actions>(
  "order",
  {
    state: () => ({
      // 被创建的临时订单信息
      orderOfCreate: {
        result: {
          userAddresses: [],
          goods: [],
          summary: {
            goodsCount: 0,
            totalPrice: 0,
            totalPayPrice: 0,
            postFee: 0,
            discountPrice: 0,
          },
        },
        status: "idle",
      },
    }),
    actions: {
      //创建订单
      async createOrder() {
        this.orderOfCreate.status = "loading";
        try {
          const response = await OrderAPI.createOrder();
          this.orderOfCreate.result = response.result;
          this.orderOfCreate.status = "success";
        } catch (error) {
          this.orderOfCreate.status = "error";
        }
      },
    },
  }
);
