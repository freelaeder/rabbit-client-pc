<script setup lang="ts">
// 获取插槽内容 最后一个 不渲染 >
import { useSlots, type VNode } from "vue";

// 获取插槽对象
const slots = useSlots();
// 通过 插槽对象 获取具体的插槽内容
const item = slots.default?.();

// 拼接
function render() {
  const result = item?.reduce((result: VNode[], item, index, array) => {
    // 是不是最后一个
    if (index < array.length - 1) {
      return result.concat([
        item,
        h("i", { class: "iconfont icon-angle-right" }),
      ]);
    } else {
      return result.concat(item);
    }
    // 渲染
  }, []);
  return h("div", { class: "xtx-bread" }, result);
}
</script>
<template>
  <render />
</template>
<style lang="less" scoped>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
}

:deep(i) {
  font-size: 12px;
  margin-left: 5px;
  margin-right: 5px;
  line-height: 20px;
}
</style>
