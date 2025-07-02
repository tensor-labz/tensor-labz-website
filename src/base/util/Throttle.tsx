export function throttle(fn: () => void, delay: number) {
  let lastCall = 0;
  return function () {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn();
    }
  };
}