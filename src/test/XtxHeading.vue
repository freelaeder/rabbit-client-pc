<script setup lang="ts">
const props = defineProps<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>();

const render = () => {
  return h(`h${props.level}`);
};
</script>
<template>
  <render />
</template>
<style lang="\" scoped></style>
