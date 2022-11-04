import type { FunctionalComponent } from "vue";

export const Parent: FunctionalComponent<
  {},
  { testEventName: (obj: { name: string }) => void }
> = (props, contenxt) => {
  console.log(contenxt, "context");
  console.log(props, "props");

  return (
    <div className="parent">
      {/* props */}
      <Son name="freelaeder" age={40}></Son>
      <hr />
      {/* 插槽 */}
      {contenxt.slots.header?.()}
      {contenxt.slots.footer?.()}
      <hr />
      {/* 自定义事件 */}
      <button onClick={() => contenxt.emit("testEventName", { name: "s" })}>
        {" "}
        click emit
      </button>
      <hr />
    </div>
  );
};
interface Props {
  name?: string;
  age?: number;
}

export const Son: FunctionalComponent = (props: Props) => {
  return (
    <div className="son">
      <h6>username : {props.name}</h6>
      <h6>age : {props.age}</h6>
    </div>
  );
};
