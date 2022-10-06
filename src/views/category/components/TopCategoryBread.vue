<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";

// 获取存储 分类对象的 store 对象
const store = useCategoryStore();
// 获取路由对象
const route = useRoute();
// 获取当前分类信息
const target = computed(() => store.currentTop(route.params.id as string));
</script>
<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target?.id">{{ target?.name }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>
<style lang="\" scoped></style>
