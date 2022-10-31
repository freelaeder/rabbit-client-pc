<!-- src/views/cart/components/CartSku.vue -->
<script setup lang="ts">
import { CartAPI } from "@/api/CartAPI";
import { useCartStore } from "@/stores/cartStore";
import type { Sku, Spec } from "@/types/Goods";
import type { Status } from "@/types/Status";

const props = defineProps<{ skuId: string; attrsText: string }>();

// 控制 显示隐藏
const visible = ref(false);
// 显示
function show() {
  visible.value = true;
  getSkuInfo();
}
// 隐藏
function hide() {
  visible.value = false;
}
const target = ref();
// 点击外部触发
onClickOutside(target, hide);
// 切换
function toggle() {
  // 如果为true 隐藏
  visible.value ? hide() : show();
}

// 用户储存 当前商品信息规格
const skuInfo = ref<{ specs: Spec[]; skus: Sku[] }>({ specs: [], skus: [] });
// 加载状态
const status = ref<Status>("idle");
// 获取商品
async function getSkuInfo() {
  // 更新状态
  status.value = "loading";
  try {
    // 发送请求获取规格信息
    const response = await CartAPI.getSkuInfo(props.skuId);
    // 存储规格信息
    skuInfo.value = response.result;
    // 更新状态
    status.value = "success";
  } catch (error) {
    // 更新状态
    status.value = "error";
  }
}
// 记录用户选中的规格
const selectedSkuId = ref<string | undefined>();

// 获取购物车store
const cartStore = useCartStore();
async function alterSku() {
  if (typeof selectedSkuId.value !== "undefined") {
    // 捕获错误
    try {
      // 发送请求 修改商品规格
      await cartStore.alterSku(props.skuId, selectedSkuId.value);
      // 消息提示
      $?.proxy?.$message({ type: "success", msg: "商品规格修改成功" });
    } catch (error) {
      // 消息提示
      $?.proxy?.$message({ type: "error", msg: "商品规格修改失败" });
    }
  } else {
    // 消息提示
    $?.proxy?.$message({ type: "warn", msg: "请选择商品规格" });
  }
}
</script>

<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="status === 'loading'" class="loading"></div>
      <GoodsSku
        @complete="selectedSkuId = $event.skuId"
        @incomplete="selectedSkuId = undefined"
        v-if="status === 'success'"
        :sku-id="skuId"
        :skus="skuInfo.skus"
        :specs="skuInfo.specs"
      />
      <XtxButton
        @click="alterSku"
        v-if="status === 'success'"
        type="primary"
        size="mini"
        style="margin-left: 60px"
      >
        确定
      </XtxButton>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
