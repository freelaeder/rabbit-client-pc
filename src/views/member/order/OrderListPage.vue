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
            v-for="item in orderStore.myOrderList[reqParams.orderState].result
              .items"
            :item="item"
            :key="item.id"
          />
        </div>
      </XtxTabPane>
    </XtxTabs>
  </div>
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
