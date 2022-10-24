import type { App } from "vue";
import Message from "./XtxMessage";

export default {
  install(app: App) {
    app.config.globalProperties.$message = Message;
  },
};
