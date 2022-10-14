<!-- src/views/goods/components/GoodsBread.vue -->
<script setup lang="ts">
import { useGoodsStore } from "@/stores/goodsStore";

// 获取用于存储商品详情信息的 store 对象
const goodsStore = useGoodsStore();
// 获取用于发送请求获取商品详情信息的方法
const { goodsInfo } = storeToRefs(goodsStore);
const { result, status } = toRefs(goodsInfo.value);
</script>

<template>
  <XtxBread v-if="status === 'success'">
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <XtxBreadItem :path="`/category/${result.categories[1].id}`">
      {{ result.categories[1].name }}
    </XtxBreadItem>
    <XtxBreadItem
      :path="`/category/sub/${result.categories[1].id}/${result.categories[0].id}`"
    >
      {{ result.categories[0].name }}
    </XtxBreadItem>
    <XtxBreadItem>
      {{ result.name }}
    </XtxBreadItem>
  </XtxBread>
  <!-- </template> -->
</template>
