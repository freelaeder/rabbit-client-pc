<script lang="ts" setup>
// 传递title
const props = defineProps<{ title: string; visible: boolean }>();
const emit = defineEmits<{ (e: "update:visible"): void }>();
// 双向数据绑定
const visibleModel = useVModel(props, "visible", emit);
// 内部的值根据外部的值变化
const domIsVisible = ref(props.visible);
// target
const target = ref<undefined | HTMLDivElement>();
// 监听外部visible
watch(
  () => props.visible,
  () => {
    // 如果变为真 内部也变为真
    if (props.visible) {
      domIsVisible.value = true;
      // 延迟执行
      // 注册到宏任务，等dom渲染之后在执行
      setTimeout(() => {
        if (target.value) {
          target.value.classList.add("fade");
        }
      }, 0);
    } else {
      // 外部的props.visible 为 false
      // 先执行 动画再销毁
      setTimeout(() => {
        if (target.value) {
          target.value.classList.remove("fade");
          target.value.addEventListener("transitionend", () => {
            domIsVisible.value = false;
          });
        }
      }, 0);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <!-- fade 自带动画  控制显示 隐藏  -->
  <div class="xtx-dialog" v-if="domIsVisible" ref="target">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
        <!-- <XtxButton type="gray" style="margin-right: 20px">取消</XtxButton>
        <XtxButton type="primary">确认</XtxButton> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  transition: all 0.4s;
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    transition: all 0.4s;
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
  &.fade {
    background: rgba(0, 0, 0, 0.5);
    .wrapper {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}
</style>
