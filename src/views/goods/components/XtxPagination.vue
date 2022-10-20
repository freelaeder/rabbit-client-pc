<!-- src/components/XtxPagination.vue -->

<script lang="ts" setup>
// // 当前页 显示的页码
// const page = ref(5);
// // 总页数
// const pages = ref(10);
// // 页面同时最多显示的页面 最多5个
// const maxVisiblePageNum = ref(5);

// page 当前页
// pages 总页数
// maxVisiblePages 页面中同时最多显示的页码数量
const props = withDefaults(
  defineProps<{ page: number; pages: number; maxVisiblePages?: number }>(),
  { maxVisiblePages: 5 }
);
// 声明当前组件要触发的自定义事件
const emit = defineEmits(["update:page"]);
// 当前页(双向数据绑定)
const page = useVModel(props, "page", emit);
const pageInfo = computed(() => {
  // 计算页面偏移量  当前页前面有几个 后面有几个
  const offset = Math.floor(props.maxVisiblePages / 2);
  // 显示的开始页
  let start = page.value - offset;
  // 显示的结束页
  // 显示的开始页码 + 页面最多显示的页码 -1
  let end = start + props.maxVisiblePages - 1;
  // 限制变化范围
  if (start < 1) {
    start = 1;
    // 重新计算结束页码
    let end_temp = start + props.maxVisiblePages - 1;
    //判断重新计算的显示的结束页码是否大于总页数
    // 如果大于总页数 让它等于总页数
    end = end_temp > props.pages ? props.pages : end_temp;
  }
  // 显示的结束页码范围
  if (end > props.pages) {
    end = props.pages;
    // 重新计算 开始页码
    let start_temp = end - props.maxVisiblePages + 1;
    // 限制开始页码
    start = start_temp < 1 ? 1 : start_temp;
  }
  // 用于存储页码值的数值
  const pagesArray = [];
  // 遍历生成页码值
  for (let i = start; i <= end; i++) {
    // 存储页码值
    pagesArray.push(i);
  }
  // 返回渲染分页组件需要的信息
  return { start, end, pagesArray };
});
</script>
<template>
  <div class="xtx-pagination">
    <a v-if="page > 1" @click="page--" href="javascript:">上一页</a>
    <span v-if="pageInfo.start > 1">...</span>
    <a
      v-for="item in pageInfo.pagesArray"
      :key="item"
      :class="{ active: item === page }"
      @click="page = item"
      href="javascript:"
    >
      {{ item }}
    </a>
    <span v-if="pageInfo.end < pages">...</span>
    <a v-if="page < pages" @click="page++" href="javascript:">下一页</a>
  </div>
</template>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
