<!-- src/components/XtxNumberBox.vue -->
<script lang="ts" setup>
interface Props {
  max: number;
  count: number;
  label: string;
}
const props = defineProps<Props>();
// 自定义事件
const emit = defineEmits(["update:count"]);
// 实现数量的双向数据绑定
const number = useVModel(props, "count", emit);
// 更新count
function onChange(step: number) {
  // 最新的count
  const next = number.value + step;
  if (next < 1) {
    number.value = 1;
  } else if (next > props.max) {
    number.value = props.max;
  } else {
    number.value = next;
  }
}
</script>

<template>
  <div class="xtx-number-box">
    <div class="label">{{ label }}</div>
    <div class="number-box">
      <a href="javascript:" @click="onChange(-1)">-</a>
      <input type="text" readonly :value="count" />
      <a href="javascript:" @click="onChange(1)">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-number-box {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .number-box {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
