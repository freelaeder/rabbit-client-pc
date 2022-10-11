<!-- src/views/category/components/SubCategorySort.vue -->
<script lang="ts" setup>
import type { GoodsRequestParams } from "@/types/Goods";
import { onBeforeRouteUpdate } from "vue-router";

type SortParams = Pick<
  GoodsRequestParams,
  "inventory" | "onlyDiscount" | "sortField" | "sortMethod"
>;

// 排序条件对象的初始值
const initialSortParams: SortParams = {
  inventory: false,
  onlyDiscount: false,
  sortField: "",
  sortMethod: "",
};

// 排序条件
const sortParams = ref<SortParams>({ ...initialSortParams });
// 定义当前组件会触发的自定义事件
const emit = defineEmits<(e: "onChanged", params: SortParams) => void>();
// 更新排序
function updateSortParams(params: Partial<SortParams>) {
  sortParams.value = {
    ...sortParams.value,
    ...params,
  };
  // 点击价格排序
  if (params.sortField === "price") {
    // asc 升序  desc 降序
    // 点击价格 切换 升序降序
    sortParams.value = {
      ...sortParams.value,
      sortMethod: sortParams.value.sortMethod === "desc" ? "asc" : "desc",
    };
  } else if (
    params.sortField === "" ||
    params.sortField === "publishTime" ||
    params.sortField === "orderNum" ||
    params.sortField === "evaluateNum"
  ) {
    sortParams.value = {
      ...sortParams.value,
      sortMethod: "",
    };
  }
  // 通过自定义事件将筛选条件传送到父级组件
  emit("onChanged", sortParams.value);
}

// 当路由发生变化后重置筛选条件
onBeforeRouteUpdate(() => {
  sortParams.value = { ...initialSortParams };
});
</script>

<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === '' }"
        @click="updateSortParams({ sortField: '' })"
        href="javascript:"
      >
        默认排序
      </a>
      <a
        @click="updateSortParams({ sortField: 'publishTime' })"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        href="javascript:"
      >
        最新商品
      </a>
      <a
        @click="updateSortParams({ sortField: 'orderNum' })"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        href="javascript:"
      >
        最高人气
      </a>
      <a
        @click="updateSortParams({ sortField: 'evaluateNum' })"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        href="javascript:"
      >
        评论最多
      </a>
      <a
        @click="updateSortParams({ sortField: 'price' })"
        :class="{ active: sortParams.sortField === 'price' }"
        href="javascript:"
      >
        价格排序
        <i
          :class="{ active: sortParams.sortMethod == 'asc' }"
          class="arrow up"
        ></i>
        <i
          :class="{ active: sortParams.sortMethod == 'desc' }"
          class="arrow down"
        ></i>
      </a>
    </div>
    <div class="check">
      <XtxCheckbox
        :checked="sortParams.inventory"
        @onChange="updateSortParams({ inventory: $event })"
      >
        仅显示有货商品
      </XtxCheckbox>
      <XtxCheckbox
        :checked="sortParams.onlyDiscount"
        @onChange="updateSortParams({ onlyDiscount: $event })"
      >
        仅显示特惠商品
      </XtxCheckbox>
    </div>
  </div>
</template>

<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: white;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: white;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
