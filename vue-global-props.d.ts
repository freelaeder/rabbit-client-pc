// vue-global-props.d.ts
import type MyConfrim from "@/utils/MyConfrim";
import Message from "./src/utils/XtxMessage";
declare module "vue" {
  interface ComponentCustomProperties {
    $message: typeof Message;
    $confirm: typeof MyConfrim;
  }
}

declare global {
  interface Window {
    QC: any;
  }
}
