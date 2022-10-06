<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore();
const { banners } = storeToRefs(categoryStore);
const { getBanners } = categoryStore;
getBanners();
</script>
<template>
  <div class="container">
    <TopCategoryBread />
    <XtxCarousel
      v-if="banners.status === 'success'"
      :count="banners.result.length"
      style="height: 500px"
    >
      <template
        v-for="(item, index) in banners.result"
        :key="item.id"
        v-slot:[`default-${index}`]
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" :alt="item.imgUrl" />
        </RouterLink>
      </template>
    </XtxCarousel>
  </div>
</template>
