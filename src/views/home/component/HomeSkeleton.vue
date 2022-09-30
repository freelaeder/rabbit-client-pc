<!-- src/views/home/components/HomeSkeleton.vue -->
<script setup lang="ts">
withDefaults(defineProps<{ bg: string }>(), { bg: "#fff" });
</script>

<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <XtxSkeleton
        bg="#e4e4e4"
        width="306px"
        height="306px"
        animated="scroll"
      />
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated="scroll" />
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated="scroll" />
    </div>
  </div>
</template>

<style scoped lang="less">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
