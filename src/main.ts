import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import piniaPersistedState from "pinia-plugin-persistedstate";
const app = createApp(App)
app.use(createPinia())
//配置 Pinia 状态持久化插件。
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router)

app.mount('#app')
