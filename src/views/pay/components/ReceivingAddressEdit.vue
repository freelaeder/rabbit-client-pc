<!-- src/views/pay/components/ReceivingAddressEdit.vue -->
<script setup lang="ts">
import type { EditAddressObject } from "@/types/Order";
import { useOrderStore } from "@/stores/orderStore";
// 用于控制弹框的显示和隐藏
const visible = ref(false);
// 向外暴露用于控制弹框显示和隐藏的响应式状态
defineExpose({ visible });

// 表单初始值
const initalValues: EditAddressObject = {
  // 收货人姓名
  receiver: "",
  // 联系方式
  contact: "",
  // 所在省份编码
  provinceCode: "",
  // 所在城市编码
  cityCode: "",
  // 所在区/县编码
  countyCode: "",
  // 详细地址
  address: "",
  // 邮政编码
  postalCode: "",
  // 地址标签,以英文逗号分割
  addressTags: "",
  // 是否为默认，0为是，1为否
  isDefault: false,
};

const formValues = ref<EditAddressObject>({ ...initalValues });
//地址
const fullLocation = ref("");
// 获取store
const orderStore = useOrderStore();
// 获取实列
const $ = getCurrentInstance();
const emit = defineEmits<{ (e: "onAddressEditSuccess", id: string): void }>();
// 添加修改 地址
async function editAddress() {
  // 捕获请求
  try {
    let id = await orderStore.addAddress({
      ...formValues.value,
      isDefault: formValues.value.isDefault ? 0 : 1,
    });
    $?.proxy?.$message({ type: "success", msg: "收货地址添加成功" });
    // 添加成功后 更新本地列表 自定义事件 传递新的 收货地址 id
    // 更新本地
    await orderStore.getAddress();
    //触发自定义事件
    emit("onAddressEditSuccess", id);
    // 关闭弹框
    visible.value = false;
  } catch (error) {
    $?.proxy?.$message({ type: "error", msg: "收货地址添加失败" });
  }
}
// 监听visible 如果为false 清空表单值
watch(visible, () => {
  if (!visible.value) {
    formValues.value = initalValues;
    fullLocation.value = "";
  }
});
</script>

<template>
  <XtxDialog v-model:visible="visible" title="添加收货地址">
    <template #body>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                v-model="formValues.receiver"
                class="input"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                v-model="formValues.contact"
                class="input"
                placeholder="请输入手机号"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                v-model:full-location="fullLocation"
                @on-changed="
                  formValues.provinceCode = $event.provinceCode;
                  formValues.cityCode = $event.cityCode;
                  formValues.countyCode = $event.countyCode;
                "
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                v-model="formValues.address"
                class="input"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                v-model="formValues.postalCode"
                class="input"
                placeholder="请输入邮政编码"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                v-model="formValues.addressTags"
                class="input"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                v-model="(formValues.isDefault as boolean)"
                type="checkbox"
                class="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <XtxButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
      <XtxButton @click="editAddress" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
