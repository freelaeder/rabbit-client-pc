type apiFunction = () => Promise<void>;

// 数据懒加载
export default function useLazyLoad(apiFunction: apiFunction) {
  const target = ref<HTMLElement>();
  // 是否进入可视区
  // isIntersecting 默认false 进入 true
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 停止监听
        stop();
        // 用户传递的 请求 方法 ，在此时调用
        apiFunction();
      }
    },
    // 只要进入就立即加载
    { threshold: 0 }
  );

  // 将target 返回 方法的调用者负责绑定元素 ，绑定谁 就监听谁
  return target;
}
