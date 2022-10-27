import type { callback } from "@/components/XtxConfrim.vue";
import XtxConfrimVue from "@/components/XtxConfrim.vue";
import { h, render } from "vue";
export default function MyConfrim(props: {
  title?: string;
  content: string;
  sure?: callback;
  cancel?: callback;
}) {
  // 创建确定框虚拟节点
  const vNode = h(XtxConfrimVue, { ...props, close });
  // 创建渲染目标容器
  const container = document.createElement("div");
  // 将虚拟节点渲染到目标容器
  render(vNode, container);
  // 将目标容器渲染到页面中
  document.body.appendChild(container);
  // 关闭框方法
  function close() {
    render(null, container);
    document.body.removeChild(container);
  }
}
