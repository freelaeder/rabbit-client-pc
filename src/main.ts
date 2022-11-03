import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import messagePlugin from "./utils/plugin";
import "normalize.css";
import "@/assets/styles/common.less";
import piniaPersistedState from "pinia-plugin-persistedstate";
// 导入请求拦截
const app = createApp(App);
app.use(createPinia());
//配置 Pinia 状态持久化插件。
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);
app.use(messagePlugin);
app.mount("#app");

// 启动请求拦截程序
if (process.env.NODE_ENV === "development") {
  const worker = require("./mocks/browser").default;
  // onUnhandledRequest: "bypass"
  // 绕过未拦截的请求, 不要发出警告
  // quiet: true
  // 安静模式, 对于拦截成功的请求不要在控制台中进行输出提示
  worker.start({ onUnhandledRequest: "bypass" });
}
