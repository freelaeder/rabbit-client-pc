import { useUserStore } from "@/stores/userStore";

// 是否有token 判断登录
export default function isLogin() {
  // get token
  const token = useUserStore().profile.result.token;
  // token 是否存在 返回boolean
  if (typeof token !== "undefined") {
    return true;
  } else {
    return false;
  }
  // return typeof token !== "undefined";
}
