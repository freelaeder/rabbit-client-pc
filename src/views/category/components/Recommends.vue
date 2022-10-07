<!-- src/views/category/components/RecommendsGoods.vue -->
<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";
import { onBeforeRouteUpdate } from "vue-router";

// 获取路由信息对象
const route = useRoute();
// 获取用于存储分类信息的 store 对象
const categoryStore = useCategoryStore();
// 从 store 中获取一级分类状态
const { topCategories } = storeToRefs(categoryStore);
// 获取一级分类详细信息
categoryStore.getTopCategoryById(route.params.id as string);
// 当路由发生变化时获取一级分类详细信息
onBeforeRouteUpdate((to) =>
  categoryStore.getTopCategoryById(to.params.id as string)
);
</script>

<template>
  <div
    class="ref-goods"
    v-for="subCategory in topCategories.result[route.params.id as string]?.children"
  >
    <div class="head">
      <h3>- {{ subCategory.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <!-- <XtxMore /> -->
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem
        :goods="goods"
        v-for="goods in subCategory.goods"
        :key="goods.id"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
