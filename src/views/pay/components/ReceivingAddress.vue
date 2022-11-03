<!-- src/views/pay/components/ReceivingAddress.vue -->
<script lang="ts" setup>
import { useOrderStore } from "@/stores/orderStore";
import type { Address } from "@/types/Order";

// ref 添加在组件上 并且内部暴露
// defineExpose({ visible });
// 获取收货地址编辑组件实列
const addressEditInstance = ref();

//添加地址
function addAdress() {
  // console.log(addressEditInstance.value.visible);
  // 修改 visible 显示弹框
  addressEditInstance.value.visible = true;
  // 改变flag
  addressEditInstance.value.flag.ismodify = false;
}

// 获取store
const orderStore = useOrderStore();
// 获取收获地址
orderStore.getAddress();

// 声明 优先级最高的收货地址
const highestPriority = ref<undefined | Address>();
// 新增收货地址
function addressAdded(id: string) {
  highestPriority.value = orderStore.address.result.find(
    (item) => item.id === id
  );
}
// 最终渲染的收货地址
const finalAddress = computed(() => {
  // 1.返回用户新增的收货地址或者选择的收货地址
  if (typeof highestPriority.value !== "undefined")
    return highestPriority.value;
  //2 返回收货地址的默认地址
  const defaultAddress = orderStore.address.result.find(
    (item) => item.isDefault === 0
  );
  if (typeof defaultAddress !== "undefined") return defaultAddress;
  //3 返回用户列表第一个列表
  const firstList = orderStore.address.result[0];
  if (typeof firstList !== "undefined") return firstList;
});

//获取切换收货地址组件实例对象
const addressSwitch = ref();
function switchAdress() {
  addressSwitch.value.visible = true;
}

// 修改收获地址
function alterAddress() {
  //显示弹框
  addressEditInstance.value.visible = true;
  // 获取当前显示的 地址赋值给 formValues
  addressEditInstance.value.formValues = {
    ...finalAddress.value,
    isDefault: finalAddress.value?.isDefault === 0 ? true : false,
  };
  addressEditInstance.value.fullLocation = finalAddress.value?.fullLocation;
  // 改变flag
  addressEditInstance.value.flag.ismodify = true;
}

//暴露 用户选择的收货地zhi
defineExpose({ addressId: () => finalAddress.value?.id });
</script>
<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!finalAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>
            收
            <i />
            货
            <i />
            人：
          </span>
          {{ finalAddress.receiver }}
        </li>
        <li>
          <span>
            联系方式：
            {{
              finalAddress.contact.replace(/(\d{3})\d{4}(\d{4})/, "$1****$3")
            }}
          </span>
        </li>
        <li>
          <span>收货地址：</span>
          {{ finalAddress.fullLocation }} {{ finalAddress.address }}
        </li>
      </ul>
      <a @click="alterAddress" v-if="finalAddress" href="javascript:">
        修改地址
      </a>
    </div>
    <div class="action">
      <XtxButton @click="switchAdress" class="btn">切换地址</XtxButton>
      <XtxButton @click="addAdress" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <!-- 编辑收货组件 -->
  <ReceivingAddressEdit
    @onAddressEditSuccess="addressAdded"
    ref="addressEditInstance"
  />
  <!-- 切换收货地址 -->
  <ReceivingAddressSwitch
    @addressSwitched="highestPriority = $event"
    :finalAddressId="finalAddress?.id"
    ref="addressSwitch"
  />
</template>

<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
