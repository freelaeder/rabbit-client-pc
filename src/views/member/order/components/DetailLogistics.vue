<!-- src/views/member/order/components/DetailLogistics.vue -->
<script lang="ts" setup>
import { useOrderStore } from "@/stores/orderStore";

const route = useRoute();
const orderStore = useOrderStore();
// 查看物流信息
orderStore.viewLogistics(route.params.id as string);
// 物流信息弹框组件实例
const orderLoginistsInstance = ref();
</script>

<template>
  <div
    class="detail-logistics"
    v-if="orderStore.logistics.status === 'success'"
  >
    <p>
      <span>{{ orderStore.logistics.result.list[0]?.time }}</span>
      <span>{{ orderStore.logistics.result.list[0]?.text }}</span>
    </p>
    <a @click="orderLoginistsInstance.visible = true" href="javascript:">
      查看物流
    </a>
  </div>
  <OrderLogistics ref="orderLoginistsInstance" />
</template>

<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
