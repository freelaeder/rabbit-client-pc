import type { Props } from "@/components/XtxMessage.vue";
import XtxMessage from "@/components/XtxMessage.vue";
import { h, render } from "vue";

// 渲染组件方法
export default function Message(props: Props) {
  // 将单文件转化为 虚拟节点对象
  const vNode = h(XtxMessage, props);
  // 创建 渲染容器
  const container = document.createElement("div");
  // 消息 渲染 页面
  document.body.appendChild(container);
  // 渲染到真实dom
  render(vNode, container);
  // 延迟3秒执行 离场动画
  setTimeout(() => {
    // 获取用于渲染 销毁 消息框的 响应式状态
    const toggle = vNode.component?.exposed?.toggle;
    if (typeof toggle !== "undefined") {
      toggle.value = false;
      setTimeout(() => {
        // 延迟 800 毫秒等待动画执行完成销毁元素
        document.removeChild(container);
      }, 800);
    }
  }, 3000);
}
