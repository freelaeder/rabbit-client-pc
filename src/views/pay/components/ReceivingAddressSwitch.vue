<!-- 切换收货地址组件: src/views/pay/components/ReceivingAddressSwitch.vue -->
<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore.js";
import type { Address } from "@/types/Order";

// 获取订单对象
const orderStore = useOrderStore();
// 控制对话框的显示和隐藏
const visible = ref(false);
// 暴露用于控制对话框显示和隐藏的响应式状态
defineExpose({ visible });

// 接受渲染的地址的id
defineProps<{ finalAddressId?: string }>();
// 通知父组件 切换收货地址
defineEmits<{ (e: "addressSwitched", address: Address): void }>();
</script>

<template>
  <XtxDialog title="更换收货地址" v-model:visible="visible">
    <template #body>
      <div class="address-switch">
        <div
          class="text item"
          v-for="item in orderStore.address.result"
          @click="
            $emit('addressSwitched', item);
            visible = false;
          "
          :class="{ active: item.id === finalAddressId }"
          :key="item.id"
        >
          <ul>
            <li>
              <span>收货人：</span>
              {{ item.receiver }}
            </li>
            <li>
              <span>联系方式：</span>
              {{ item.contact }}
            </li>
            <li>
              <span>收货地址：</span>
              {{ item.fullLocation + item.address }}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #footer>
      <XtxButton
        @click="visible = false"
        type="primary"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
    </template>
  </XtxDialog>
</template>

<style scoped lang="less">
.address-switch {
  height: 478px;
  overflow-y: auto;
}
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
