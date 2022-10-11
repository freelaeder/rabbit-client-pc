<!-- src/components/XtxInfiniteLoading.vue -->
<script lang="ts" setup>
const props = defineProps<{ loading: boolean; finished: boolean }>();
const target = ref();
// 定义自定义事件
const emit = defineEmits<{ (e: "infinite"): void }>();
// 监听是否进入可视区
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && !props.loading && !props.finished) {
    // 触发自定义事件
    emit("infinite");
  }
});
</script>
<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(@/assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(@/assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
