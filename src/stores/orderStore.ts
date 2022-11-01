import { OrderAPI } from "@/api/OrderAPI";
import type {
  Address,
  EditAddressObject,
  OrderOfCreateResponse,
} from "@/types/Order";
import type { Status } from "@/types/Status";

type State = {
  // 创建临时的订单信息
  orderOfCreate: {
    result: OrderOfCreateResponse;
    status: Status;
  };
  // 收货地址列表
  address: {
    result: Address[];
    status: Status;
  };
};

type Getters = {};
type Actions = {
  //创建订单
  createOrder(): Promise<void>;
  // 添加收获地址
  addAddress(address: EditAddressObject): Promise<string>;
  //获取收货地址
  getAddress(): Promise<void>;
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
      // 收货地址列表
      address: {
        result: [],
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
      // 添加收货地址
      async addAddress(address) {
        const response = await OrderAPI.addAddress(address);
        return response.result.id;
      },
      // 获取收货地址
      async getAddress() {
        // 更新状态
        this.address.status = "loading";
        try {
          // 发送获取收货地址请求
          const response = await OrderAPI.getAddress();
          // 存储
          this.address.result = response.result;
          //更新状态
          this.address.status = "success";
        } catch (error) {
          //更新状态
          this.address.status = "error";
        }
      },
    },
  }
);
