<script setup lang="ts">
const props = defineProps<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>();
// 获取插槽对象
const slots = useSlots();

const render = () => {
  return h(`h${props.level}`, slots.default?.());
};
</script>
<template>
  <render />
</template>
<style lang="\" scoped></style>
