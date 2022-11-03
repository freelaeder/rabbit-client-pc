import { setupWorker } from "msw";
import { handles } from "./handlers";
// 注册请求拦截程序
const worker = setupWorker(...handles);

export default worker;
