<script setup lang="ts">
import { RouterLink } from "vue-router";

withDefaults(
  defineProps<{
    size?: "large" | "middle" | "small" | "mini";
    type?: "default" | "primary" | "plain" | "gray";
    to?: string;
  }>(),
  { size: "middle", type: "default", to: "" }
);
</script>

<template>
  <button v-if="!to" class="xtx-button ellipsis" :class="[size, type]">
    <slot></slot>
  </button>
  <RouterLink class="xtx-button ellipsis" :class="[size, type]" v-else :to="to">
    <slot></slot>
  </RouterLink>
</template>

<style scoped lang="less">
.xtx-button {
  appearance: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  a {
    width: 100%;
    height: 100%;
    color: #fff;
  }
}
/* 控制按钮尺寸 */
.large {
  width: 240px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
.middle {
  width: 180px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
.small {
  width: 100px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.mini {
  width: 60px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
/* 控制按钮类型 */
.default {
  border-color: #e4e4e4;
  color: #666;
}
.primary {
  border-color: @xtxColor;
  background: @xtxColor;
  color: #fff;
}
.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background: lighten(@xtxColor, 50%);
}
.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}
</style>
