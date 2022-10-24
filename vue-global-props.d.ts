// vue-global-props.d.ts
import Message from "./src/utils/XtxMessage";
declare module "vue" {
  interface ComponentCustomProperties {
    $message: typeof Message;
  }
}
