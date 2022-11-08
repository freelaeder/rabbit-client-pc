import { OrderAPI } from "@/api/OrderAPI";
import type {
  Address,
  EditAddressObject,
  LogisticsResponse,
  OrderOfCreateResponse,
  OrderResponse,
  OrderState,
  SubmitOrderObject,
  SubmitOrderResponse,
} from "@/types/Order";
import type { Pagination } from "@/types/Response";
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
  // 订单详情信息
  orderInfo: {
    result: Partial<OrderResponse>;
    status: Status;
  };
  // 获取我的订单详情
  myOrderList: {
    [key in OrderState]: {
      result: Partial<Pagination<OrderResponse>>;
      status: Status;
    };
  };
  // 物流信息
  logistics: {
    result: Partial<LogisticsResponse>;
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
  // 获取订单详情
  getOrderInfoById(id: string): Promise<void>;
  // 修改收货地址
  updateAddress(address: EditAddressObject): Promise<string>;
  // 提交订单
  submitOrder(order: SubmitOrderObject): Promise<SubmitOrderResponse>;
  // 获取我的订单列表
  getMyOrderList(
    page: number,
    pageSize: number,
    orderState: OrderState
  ): Promise<void>;
  // 取消订单
  cancelOrder(id: string, cancelReason: string): Promise<OrderResponse>;
  // 删除订单
  removeOrder(ids: string[]): Promise<null>;
  // 确定收获
  confirmReceiptGoods(id: string): Promise<OrderResponse>;
  // 获取物流信息
  viewLogistics(id: string): Promise<void>;
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
      // 获取订单详情信息
      orderInfo: {
        result: {},
        status: "idle",
      },
      // 我的订单列表
      myOrderList: {
        0: { result: {}, status: "idle" },
        1: { result: {}, status: "idle" },
        2: { result: {}, status: "idle" },
        3: { result: {}, status: "idle" },
        4: { result: {}, status: "idle" },
        5: { result: {}, status: "idle" },
        6: { result: {}, status: "idle" },
      },
      // 物流信息
      logistics: {
        result: {},
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
      // 获取订单详情
      async getOrderInfoById(id) {
        this.orderInfo.status = "loading";
        try {
          const response = await OrderAPI.getOrderInfoById(id);
          this.orderInfo.result = response.result;
          this.orderInfo.status = "success";
        } catch (error) {
          this.orderInfo.status = "error";
        }
      },
      // 修改收货地址
      async updateAddress(address) {
        const { id, ...rest } = address;
        const response = await OrderAPI.updateAddress(id!, rest);
        return response.result.id;
      },
      // 提交订单
      async submitOrder(order) {
        const response = await OrderAPI.submitOrder(order);
        return response.result;
      },
      // 获取我的订单
      async getMyOrderList(page, pageSize, orderState) {
        // 更新状态
        this.myOrderList[orderState].status = "loading";
        try {
          // 发送请求
          const response = await OrderAPI.getMyOrders(
            page,
            pageSize,
            orderState
          );
          // 储存信息
          this.myOrderList[orderState].result = response.result;
          // 更新状态
          this.myOrderList[orderState].status = "success";
        } catch (error) {
          // 更新状态
          this.myOrderList[orderState].status = "error";
        }
      },
      // 取消订单
      async cancelOrder(id, cancelReason) {
        const response = await OrderAPI.cancelOrder(id, cancelReason);
        return response.result;
      },
      // 删除订单
      async removeOrder(ids) {
        const response = await OrderAPI.removeOrder(ids);
        return response.result;
      },
      // 确定收货
      async confirmReceiptGoods(id) {
        const response = await OrderAPI.confirmReceiptGoods(id);
        return response.result;
      },
      // 物流信息
      async viewLogistics(id) {
        this.logistics.status = "loading";
        try {
          const response = await OrderAPI.viewLogistics(id);
          this.logistics.result = response.result;
          this.logistics.status = "success";
        } catch (error) {
          this.logistics.status = "error";
        }
      },
    },
  }
);
