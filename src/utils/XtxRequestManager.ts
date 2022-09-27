import { useUserStore } from '@/stores/userStore';
import {AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from 'axios';
import axios from 'axios';
import router from '@/router';
interface XtxAxiosInstance extends AxiosInstance{
    request<T = any, D = any >(config: AxiosRequestConfig<D>): Promise<T>
}
interface XtxRequestConfig<D> {
    url: string;
    method?: "get" | "post" | "delete" | "put" | "patch";
    data?: D;
  }
export default class XtxRequestManager{
    //既然要实现单例模式，当前类的实例就不能被外部创建
    //存储单例对象
    private static _singletonInstance: XtxRequestManager;
    // 私有的只读的用于发送请求的 axios 实例
    private readonly _instance: XtxAxiosInstance;
    
     // 获取存储用户信息的 store 对象
   private userStore = useUserStore();
     // 请求基准地址
    public static baseUrl: string ="https://pcapi-xiaotuxian-front-devtest.itheima.net/";
    //将构造函数设置为私有，防止外部直接实例化当前类来创建实例
    private constructor(){
        //创建axios实例对象专门用于小兔鲜服务端进行请求交互
        this._instance = axios.create({ baseURL: XtxRequestManager.baseUrl });
        //注册请求拦截器(在请求头中加token)
        this._instance.interceptors.request.use(this._addTokenToHeader.bind(this));
        //注册响应拦截器
        this._instance.interceptors.response.use(
            //剥离axios响应对象，直接返回服务端的响应状态(响应拦截器->成功态)
            this._peelOffAxiosResponse,
            //登录状态失效，清空用户信息，跳转到登录页面(响应拦截器->失败态)
            this._unauthorized.bind(this)
        )
    }
    //用于获取单例对象的
    static get instance(){
        //判断单例对象是否存在
        if(typeof XtxRequestManager._singletonInstance === 'undefined'){
            //如果存在创建该对象
            XtxRequestManager._singletonInstance = new XtxRequestManager();
        }
        //返回单例
        return XtxRequestManager._singletonInstance
        
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
  //剥离axios 响应对象，直接返回服务端的响应状态(响应拦截器->成功态)
  private _peelOffAxiosResponse(response: AxiosResponse){
    return response.data;
}
  //登录状态失效，清空用户信息(响应拦截器->失败态)
  private _unauthorized(error: unknown){
    if(error instanceof AxiosError){
        if(error.response?.status===401){
            //清空用户信息
            this.userStore.$reset()
            //跳转到登录页面
            router.replace("./login")
        }
        throw error;
    }
  }
  public request<T,D = any>(config: XtxRequestConfig<D>): Promise<T>{
    //指定默认的请求方法
    const method = config.method ?? "get";
    //发送请求并返回请求对象
    return this._instance.request<T,D>({
        url:config.url,
        [method ==="get"? "params":"data"]: config.data,
        method,
    })
  }
}