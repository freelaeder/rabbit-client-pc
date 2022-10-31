// src/components/library/Confirm.ts
import XtxConfirm from "../components/XtxConfrim.vue";
import { h, render } from "vue";

export default function Confirm(props: { title?: string; content: string }) {
  return new Promise((resolve, reject) => {
    // 创建确认框虚拟节点
    const vNode = h(XtxConfirm, {
      ...props,
      sure: resolve,
      cancel: reject,
      close,
    });
    // 创建渲染目标容器
    const container = document.createElement("div");
    // 将虚拟节点渲染到目标容器
    render(vNode, container);
    // 将目标容器渲染到页面中
    document.body.appendChild(container);
    // 关闭确认框的方法
    function close() {
      render(null, container);
      document.body.removeChild(container);
    }
  });
}
