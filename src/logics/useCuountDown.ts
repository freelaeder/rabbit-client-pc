export default function useCountDown() {
  // 定义描述
  const count = ref(60);
  // 倒计时
  const { pause, isActive, resume } = useIntervalFn(
    () => {
      if (count.value > 0) {
        count.value--;
      } else {
        // 停止
        pause();
      }
    },
    1000,
    { immediate: false }
  );

  // 开始倒计时
  const start = (seconds = 60) => {
    // 如果正在 倒计时， 阻止 程序继续开启倒计时
    if (isActive.value) return;
    // 重置倒计时数
    count.value = seconds;
    // 重新开始倒计时
    resume();
  };
  return { count, start, isActive };
}
