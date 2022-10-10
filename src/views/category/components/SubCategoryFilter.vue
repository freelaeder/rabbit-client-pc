<!-- src/views/category/components/SubCategoryFilter.vue -->
<script lang="ts" setup>
import { useCategoryStore } from "@/stores/categoryStore";
import type { GoodsRequestParams } from "@/types/Goods";
import { onBeforeRouteUpdate } from "vue-router";
// 导入 lodash
import omitBy from "lodash/omitBy";
import transform from "lodash/transform";

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
  // 重置用户选择的筛选条件
  selectFilters.value = {};
});

// 定义自定义事件
const emit = defineEmits<{ (e: "onChanged", params: FilterParams): void }>();

// 定义收集筛选条件的对象的数据类型
interface SelectedFilters {
  brandId: string;
  [groupName: string]: string;
}
// 服务器要求的请求参数格式
// {brandId:string,attrs: {group:string,properTyName:string[]}}
type FilterParams = Partial<Pick<GoodsRequestParams, "brandId" | "attrs">>;
// 存储 用户选择的筛选条件  partial 可选
const selectFilters = ref<Partial<SelectedFilters>>({});
// 但筛选条件发生变化时
function onSelectedFiltersChanged(filters: Partial<SelectedFilters>) {
  // 更新筛选条件
  selectFilters.value = { ...selectFilters.value, ...filters };
  // 如果value 等于 undefined 删除 该属性
  // 用户选择没有undefined temp
  const temp = omitBy(selectFilters.value, (value) => value === undefined);

  // {} 版 的reduce
  /*
  transform(处理的对象，处理函数，初始值)
   */
  const params = transform(
    temp,
    function (result: FilterParams, value, key) {
      if (key === "brandId") {
        result[key] = value;
      } else {
        if (typeof result["attrs"] === "undefined") result["attrs"] = [];
        result["attrs"].push({ groupName: key, propertyName: value! });
      }
    },
    {}
  );
  // console.log(temp);
  // console.log(selectFilters.value);

  // 触发自定义事件
  emit("onChanged", params);
}
</script>

<template>
  <div
    class="sub-filter"
    v-if="categoryStore.subCategoryFilters.status === 'loading'"
  >
    <XtxSkeleton class="item" width="800px" height="25px" />
    <XtxSkeleton class="item" width="800px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
  </div>
  <div class="sub-filter" v-else>
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          :class="{ active: selectFilters.brandId === undefined }"
          @click="onSelectedFiltersChanged({ brandId: undefined })"
          href="javascript:"
        >
          全部
        </a>
        <a
          :class="{ active: selectFilters.brandId === brand.id }"
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
          :class="{ active: selectFilters[saleProperties.name] === undefined }"
          href="javascript:"
          @click="
            onSelectedFiltersChanged({ [saleProperties.name]: undefined })
          "
        >
          全部
        </a>
        <a
          :class="{ active: selectFilters[saleProperties.name] === i.name }"
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
