<script setup lang="ts">
import MyConfrim from "./utils/MyConfrim";
function onSureClick() {
  alert("sure");
}
function onCancelClick() {
  alert("cancel");
}
</script>
<template>
  <RouterView />
  <button
    @click="
      MyConfrim({
        content: '测试',
        sure: onSureClick,
        cancel: onCancelClick,
      })
    "
  >
    click
  </button>
</template>
<style lang="less"></style>
