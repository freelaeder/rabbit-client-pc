import type { App } from "vue";
import MyConfrim from "./MyConfrim";
import Message from "./XtxMessage";

export default {
  install(app: App) {
    app.config.globalProperties.$message = Message;
    app.config.globalProperties.$confirm = MyConfrim;
  },
};
