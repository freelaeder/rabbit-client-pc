import { fileURLToPath, URL } from "node:url";
import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      // 指定组件位置，默认是 src/components
      dirs: ["src/components", "src/views"],
      // 搜索子目录
      deep: true,
      // 组件的有效文件扩展名
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "components.d.ts",
    }),
    AutoImport({
      // 注册要自动引入的库
      imports: ["vue", "vue-router", "pinia", "@vueuse/core", "vee-validate"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "auto-import.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持在 JavaScript 文件中将 less 作为模块导入
        javascriptEnabled: true,
        modifyVars: {
          hack: `
            true; 
            @import "${join(__dirname, "./src/assets/styles/variables.less")}"; 
            @import "${join(__dirname, "./src/assets/styles/mixin.less")}";
          `,
        },
      },
    },
  },
  build: {
    // 在构建阶段 如果图片小于10k 编译 base64
    assetsInlineLimit: 10000,
  },
});
