<!-- src/views/category/components/SubCategoryFilter.vue -->
<script lang="ts" setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { onBeforeRouteUpdate } from "vue-router";

// 获取存储分类状态的对象
const categoryStore = useCategoryStore();
// 获取路由
const route = useRoute();
// 获取筛选条件的zhuangtai
const { subCategoryFilters } = storeToRefs(categoryStore);
// 获取筛选条件的方法
const { getSubCategoryFilters } = categoryStore;

// 获取筛选条件
getSubCategoryFilters(route.params.sub as string);

// 路由切换前
onBeforeRouteUpdate((to) => {
  // 获取目标页面的筛选条件
  getSubCategoryFilters(to.params.sub as string);
});

// 定义收集筛选条件的对象的数据类型
interface SelectedFilters {
  brandId: string;
  [groupName: string]: string;
}
// 存储 用户选择的筛选条件  partial 可选
const selectFilters = ref<Partial<SelectedFilters>>({});
// 但筛选条件发生变化时
function onSelectedFiltersChanged(filters: Partial<SelectedFilters>) {
  // 更新筛选条件
  selectFilters.value = { ...selectFilters.value, ...filters };
  console.log(selectFilters.value);
}
</script>

<template>
  <div class="sub-filter">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="onSelectedFiltersChanged({ brandId: undefined })"
          class="active"
          href="javascript:"
        >
          全部
        </a>
        <a
          href="javascript:"
          v-for="brand in subCategoryFilters.result[route.params.sub as string]?.brands"
          :key="brand.id"
          @click="onSelectedFiltersChanged({ brandId: brand.id })"
        >
          {{ brand.name }}
        </a>
      </div>
    </div>
    <div
      class="item"
      v-for="saleProperties in subCategoryFilters.result[route.params.sub as string]?.saleProperties"
    >
      <div class="head">{{ saleProperties.name }}：</div>
      <div class="body">
        <a
          class="active"
          href="javascript:"
          @click="
            onSelectedFiltersChanged({ [saleProperties.name]: undefined })
          "
        >
          全部
        </a>
        <a
          href="javascript:"
          v-for="i in saleProperties.properties"
          :key="i.id"
          @click="onSelectedFiltersChanged({ [saleProperties.name]: i.name })"
        >
          {{ i.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
