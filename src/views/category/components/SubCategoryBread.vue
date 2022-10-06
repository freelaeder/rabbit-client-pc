<!-- src/views/category/components/SubCategoryBread.vue -->
<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";

const route = useRoute();
const categoryStore = useCategoryStore();

const target = computed(() =>
  categoryStore.currentTopAndSub(
    route.params.top as string,
    route.params.sub as string
  )
);
</script>
<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target.topCategory?.id">
        {{ target.topCategory?.name }}
      </XtxBreadItem>
    </transition>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target.subCategory?.id">
        {{ target.subCategory?.name }}
      </XtxBreadItem>
    </transition>
  </XtxBread>
</template>
