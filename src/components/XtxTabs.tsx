// 以react module 的方式导入less
// 防止 css全局污染
import type { FunctionalComponent } from "vue";
import styles from "./XtxTabs.module.less";
export const XtxTabs: FunctionalComponent<
  { name: string },
  {
    "update:name": (activeName: string) => void;
    onTabClick: (index: number) => void;
  }
> = (props, context) => {
  // 获取默认插槽的内容
  const defaultSlots = context.slots.default?.();
  // 用于储存具体元素的虚拟节点
  const target: any[] = [];
  defaultSlots?.forEach((item) => {
    if (typeof item.type === "symbol") {
      if (item.children instanceof Array) {
        item.children?.forEach((children) => target.push(children));
      }
    } else {
      // 当前节点不是通过遍历产生
      // 即当前节点就是代码具体元素的虚拟节点
      target.push(item);
    }
  });
  // 点击事件
  const tabClickHandler = (index: number, activeName: string) => {
    // 更改父组件的 active 激活类名
    context.emit("update:name", activeName);
    // 将当前点击的选项卡索引传递到父组件
    context.emit("onTabClick", index);
  };

  return (
    <div class={styles["xtx-tabs"]}>
      <nav>
        {target?.map((item, index) => {
          item.props.isActive = props.name === item.props.name;
          return (
            <a
              href="javascript:;"
              className={item.props.name === props.name ? styles.active : ""}
              onClick={() => tabClickHandler(index, item.props.name)}
            >
              {item.props?.label}
            </a>
          );
        })}
      </nav>
      {defaultSlots}
    </div>
  );
};
