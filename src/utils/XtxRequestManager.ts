import { useUserStore } from "@/stores/userStore";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { AxiosError } from "axios";
import router from "@/router";

interface XtxAxiosInstance extends AxiosInstance {
  request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
}

interface XtxRequestConfig<D> {
  url: string;
  method?: "get" | "post" | "delete" | "put" | "patch";
  data?: D;
}

export default class XtxRequestManager {
  // 静态的私有属性, 用于存储单例对象
  private static _singletonInstance: XtxRequestManager;
  // 私有的只读的用于发送请求的 axios 实例
  private readonly _instance: XtxAxiosInstance;
  // 请求基准地址
  public static baseUrl: string = "https://apipc-xiaotuxian-front.itheima.net";
  // 获取存储用户信息的 store 对象
  private userStore = useUserStore();

  // 创建私有构造函数, 避免外部直接实例化该类
  private constructor() {
    // 创建 axios 实例对象
    this._instance = axios.create({ baseURL: XtxRequestManager.baseUrl });
    // 注册请求拦截器
    this._instance.interceptors.request.use(
      // 在请求头中加入 token (请求拦截器 -> 成功态 )
      this._addTokenToHeader.bind(this)
    );
    // 注册响应拦截器
    this._instance.interceptors.response.use(
      // 剥离 axios 响应对象, 直接返回服务端的响应状态  (响应拦截器 -> 成功态)
      this._peelOffAxiosResponse,
      // 登录状态失效, 清空用户信息, 跳转到登录页面 (响应拦截器 -> 失败态)
      this._unauthorized.bind(this)
    );
  }

  // 在请求头中加入 token (注册请求拦截器 -> 成功态 )
  private _addTokenToHeader(config: AxiosRequestConfig) {
    // 获取 token
    const token = this.userStore.profile.token;
    // 如果 token 存在, 将其添加到请求头中
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    // 返回请求配置对象
    return config;
  }

  // 剥离 axios 响应对象, 直接返回服务端的响应状态  (响应拦截器 -> 成功态)
  private _peelOffAxiosResponse(response: AxiosResponse) {
    return response.data;
  }

  // 登录状态失效, 清空用户信息 (响应拦截器 -> 失败态)
  private _unauthorized(error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        // 清空用户信息
        this.userStore.$reset();
        // 跳转到登录页面
        router.replace("/login");
      }
      throw error;
    }
  }

  // 用于获取实例对象的静态方法
  static get instance(): XtxRequestManager {
    // 判断单例是否存在
    if (typeof XtxRequestManager._singletonInstance === "undefined") {
      // 单例对象不存在, 创建单例对象
      XtxRequestManager._singletonInstance = new XtxRequestManager();
    }
    // 返回单例对象
    return XtxRequestManager._singletonInstance;
  }

  // 外部用于发送请求的方法
  public request<T, D = any>(config: XtxRequestConfig<D>): Promise<T> {
    // 指定默认的请求方法
    const method = config.method ?? "get";
    // 发送请求并返回请求对象
    return this._instance.request<T, D>({
      url: config.url,
      [method === "get" ? "params" : "data"]: config.data,
      method,
    });
  }
}
