<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";
import type { GoodsRequestParams } from "@/types/Goods";
import { onBeforeRouteUpdate } from "vue-router";

const categoryStore = useCategoryStore();
const { categoryGoods } = storeToRefs(categoryStore);
const { getCategoryGoods } = categoryStore;
const route = useRoute();

// 存储筛选条件
let filterParams: Partial<GoodsRequestParams> = {};
// 存储排序条件
let sortParams: Partial<GoodsRequestParams> = {};
// 储存页码数据
let pageParams = { page: 1, pageSize: 10 };
// 修改筛选状态
function updateFilterParams(params: Partial<GoodsRequestParams>) {
  filterParams = params;
}
// 修改排序状态
function updateSortParams(params: Partial<GoodsRequestParams>) {
  sortParams = params;
}

function getReqParams() {
  return { ...filterParams, ...sortParams, ...pageParams };
}
// 筛选条件 排序条件 发生变化 重新获取商品列表
function sendRequest() {
  // 筛选条件，排序条件发生变化 重置 页码
  // 筛选条件、排序条件发生变化 重置页码
  pageParams.page = 1;
  // 重置请求状态
  categoryGoods.value.status = "loading";
  // 合并请求参数
  // 发送请求
  getCategoryGoods(route.params.sub as string, getReqParams());
}
// loadMore

function loadMore() {
  // 页码加一
  pageParams.page = pageParams.page + 1;
  // 合并参数
  // const reqParams = { ...filterParams, ...sortParams, ...pageParams };
  getCategoryGoods(route.params.sub as string, getReqParams());
}

// 初次加载发送请求
getCategoryGoods(route.params.sub as string, getReqParams());

// 路由变化 重新获取商品列表
onBeforeRouteUpdate((to) => {
  // 重置筛选条件
  filterParams = {};
  // 重置排序条件
  sortParams = {};
  // 重置页码
  pageParams.page = 1;
  // 重置请求加载状态
  categoryGoods.value.status = "loading";
  // 发送请求
  getCategoryGoods(to.params.sub as string, getReqParams());
  console.log("00999");
});
</script>
<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <SubCategoryBread />
    <!-- 筛选组件 -->
    <SubCategoryFilter
      @onChanged="
        updateFilterParams($event);
        sendRequest();
      "
    />
    <!-- 商品区块 -->
    <div class="goods-list">
      <!-- 排序组件 -->
      <SubCategorySort
        @onChanged="
          updateSortParams($event);
          sendRequest();
        "
      />
      <!-- 商品列表 -->
      <GoodsList :goodsList="categoryGoods.result.items" />
      <!-- 无限列表组件 -->
      <XtxInfiniteLoading
        @infinite="loadMore"
        :loading="categoryGoods.status === 'loading'"
        :finished="categoryGoods.status === 'finished'"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
