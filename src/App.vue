<script setup lang="ts">
import type { ComponentInternalInstance } from "vue";

// import message from "@/utils/XtxMessage";
const $ = getCurrentInstance();
console.log($);
function showMess($: ComponentInternalInstance) {
  $?.proxy?.$message({ type: "error", msg: "9" });
}
</script>
<template>
  <!-- <button @click="$message({ type: 'success', msg: 'ff' })">button</button> -->
  <button @click="showMess($)">button</button>
  <RouterView />
</template>
<!-- src/App.vue -->
<style lang="less"></style>
