import type { SetupContext } from "vue";

export const XtxTabPane = (
  props: Readonly<{ label: string; name: string; isActive: boolean }>,
  context: SetupContext
) => {
  return props.isActive ? <div>{context.slots.default?.()}</div> : null;
};
