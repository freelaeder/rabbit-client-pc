<!-- src/views/member/order/components/CancelOrder.vue -->
<script setup lang="ts">
import { cancelReason } from "@/contants/cancelReason";
import { useOrderStore } from "@/stores/orderStore";
// 用于控制弹框的显示和隐藏
const visible = ref(false);
// 用于存储用户选择的取消原因
const selected = ref("");
// 存储取消的订单id
const orderId = ref<string | undefined>();
// 导出
defineExpose({ visible, orderId });
// 获取store
const orderStore = useOrderStore();
// 自定义事件
const emit = defineEmits<{ (e: "requestOrderList"): void }>();
// 组件实列
const $ = getCurrentInstance();
// 取消订单方法
async function cancelOrder() {
  if (!selected.value) return;
  try {
    // 发送请求取消订单
    await orderStore.cancelOrder(orderId.value!, selected.value);
    $?.proxy?.$message({ type: "success", msg: "取消订单成功" });
    // 通知父组件重新获取订单列表
    emit("requestOrderList");
    // 关闭弹框
    visible.value = false;
  } catch (error) {
    $?.proxy?.$message({ type: "success", msg: "取消订单成功" });
  }
}
</script>

<template>
  <XtxDialog title="取消订单" v-model:visible="visible">
    <!-- 组件内容 -->
    <template #body>
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            v-for="reason in cancelReason"
            :key="reason"
            :class="{ active: reason === selected }"
            @click="selected = reason"
          >
            {{ reason }}
          </a>
        </div>
      </div>
    </template>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
      <XtxButton @click="cancelOrder" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 250px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
