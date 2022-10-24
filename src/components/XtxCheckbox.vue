<!-- src/components/XtxCheckbox.vue -->
<script lang="ts" setup>
// const IsChecked = ref(false);
const props = withDefaults(
  defineProps<{ modelValue?: boolean; checked?: boolean }>(),
  {
    modelValue: undefined,
  }
);

// 判断是不是双向绑定
const isVModel = typeof props.modelValue !== "undefined";
// 使用vueuse 实现组件数据双向绑定
const checked = isVModel ? useVModel(props, "modelValue") : ref(props.checked);
// 自定义事件
const emit = defineEmits<{ (e: "onChanged", checked: boolean): void }>();

const toggle = () => {
  checked.value = !checked.value;
  // 不是双向绑定
  if (!isVModel) {
    // 调用自定义事件
    emit("onChanged", checked.value);
  }
};

watch(
  () => props.checked,
  () => {
    if (!isVModel) {
      // console.log("d");
      checked.value = props.checked;
    }
  }
);
</script>
<template>
  <div class="xtx-checkbox" @click="toggle">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
