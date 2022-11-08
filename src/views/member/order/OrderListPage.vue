<!-- 订单列表: src/views/member/order/OrderListPage.vue -->
<script setup lang="ts">
import { orderStatus } from "@/contants/orderStatus";
import { XtxTabs } from "@/components/XtxTabs";
import { XtxTabPane } from "@/components/XtxTabPane";
import { useOrderStore } from "@/stores/orderStore";
import type { OrderState } from "@/types/Order";
// 默认激活的订单状态名称
const name = ref("all");

const orderStore = useOrderStore();
const reqParams = ref<{ orderState: OrderState }>({ orderState: 0 });
//发送请求
watchEffect(() => {
  orderStore.getMyOrderList(1, 10, reqParams.value.orderState);
});

// 取消订单组件实列
const cancelInstance = ref();
// 物流信息弹框 实列
const orderLogisticsInstance = ref();
// 取消订单弹框
function cancelOrder(id: string) {
  // 控制订单取消弹框显示
  cancelInstance.value.visible = true;
  // 传递取消的订单id
  cancelInstance.value.orderId = id;
}
// 显示物流弹框
function viewLogistics(id: string) {
  // 控制物流弹框显示
  orderLogisticsInstance.value.visible = true;
  // 获取当前的物流信息
  orderStore.viewLogistics(id);
}
</script>

<template>
  <div class="member-order">
    <XtxTabs v-model:name="name" @onTabClick="reqParams.orderState = $event">
      <XtxTabPane
        v-for="item in orderStatus"
        :label="item.label"
        :name="item.name"
        :key="item.name"
      >
        <div class="order-list">
          <div
            v-if="
              orderStore.myOrderList[reqParams.orderState].status === 'loading'
            "
            class="loading"
          ></div>
          <div
            v-if="
              orderStore.myOrderList[reqParams.orderState].result.items
                ?.length === 0
            "
            class="none"
          >
            暂无数据
          </div>
          <OrderItem
            @onCancelButton="cancelOrder"
            @removeOrderList="
              orderStore.getMyOrderList(1, 10, reqParams.orderState)
            "
            @confirmReceiptGoodsSuccess="
              orderStore.getMyOrderList(1, 10, reqParams.orderState)
            "
            @viewLogistics="viewLogistics"
            v-for="item in orderStore.myOrderList[reqParams.orderState].result
              .items"
            :item="item"
            :key="item.id"
          />
        </div>
      </XtxTabPane>
    </XtxTabs>
  </div>
  <!-- 取消订单 -->
  <CancelOrder
    @requestOrderList="orderStore.getMyOrderList(1, 10, reqParams.orderState)"
    ref="cancelInstance"
  />
  <!-- 物流信息弹框 -->
  <OrderLogistics ref="orderLogisticsInstance" />
</template>
<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  .loading {
    height: calc(100% - 60px);
    width: 100%;
    min-height: 400px;
    position: absolute;
    left: 0;
    top: 60px;
    background: rgba(255, 255, 255, 0.9) url(@/assets/images/loading.gif)
      no-repeat center 18%;
  }
  .none {
    height: 400px;
    text-align: center;
    line-height: 400px;
    color: #999;
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>
