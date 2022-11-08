<script lang="ts" setup>
import { useOrderStore } from "@/stores/orderStore";
import { XtxStepItem } from "@/components/XtxStepItem";
import { XtxSteps } from "@/components/XtxSteps";
const orderStore = useOrderStore();

// 路由信息
const route = useRoute();
// 获取订单详情
orderStore.getOrderInfoById(route.params.id as string);
</script>
<template>
  <div class="order-detail-page">
    <!-- 订单状态 -->
    <OrderStatus />
    <!-- 步骤条-->
    <!-- 如果订单是取消状态只能说明用户提交过订单 -->
    <XtxSteps
      :active="
        orderStore.orderInfo.result.orderState === 6
          ? 1
          : orderStore.orderInfo.result.orderState
      "
    >
      <XtxStepItem
        title="提交订单"
        :desc="orderStore.orderInfo.result.createTime"
      ></XtxStepItem>
      <XtxStepItem
        title="付款成功"
        :desc="orderStore.orderInfo.result.payTime"
      ></XtxStepItem>
      <XtxStepItem
        title="商品发货"
        :desc="orderStore.orderInfo.result.consignTime"
      ></XtxStepItem>
      <XtxStepItem
        title="确认收货"
        :desc="orderStore.orderInfo.result.endTime"
      ></XtxStepItem>
      <XtxStepItem
        title="订单完成"
        :desc="orderStore.orderInfo.result.evaluationTime"
      ></XtxStepItem>
    </XtxSteps>
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
