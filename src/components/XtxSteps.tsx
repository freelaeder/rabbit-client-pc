import styles from "@/components/XtxSteps.module.less";
import type { FunctionalComponent } from "vue";

interface Props {
  active: number;
}

export const XtxSteps: FunctionalComponent<Props> = (props, context) => {
  // 最终渲染的虚拟节点
  const result: any[] = [];
  // 获取插槽内容
  const defaultSlots = context.slots.default?.();
  defaultSlots?.forEach((item) => {
    // 检测当前虚拟节点是否是 v-for 生成的
    if (typeof item.type === "symbol") {
      if (item.children instanceof Array) {
        result.push(...item.children);
      }
    } else {
      result.push(item);
    }
  });

  return (
    <div className={styles["xtx-steps"]}>
      {result.map((item, index) => (
        <div
          className={`${styles["xtx-steps-item"]} ${
            index + 1 <= props.active ? styles.active : ""
          }`}
        >
          <div className={styles["step"]}>
            <span>{index + 1}</span>
          </div>
          <div className={styles["title"]}>{item.props.title}</div>
          <div className={styles["desc"]}>{item.props.desc}</div>
        </div>
      ))}
    </div>
  );
};
