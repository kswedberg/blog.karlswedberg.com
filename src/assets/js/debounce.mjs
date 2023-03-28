export const debounce = function debounce(fn, timerDelay, ctx) {
  const delay = timerDelay === undefined ? 200 : timerDelay;
  let timeout;

  return function(...args) {
    ctx = ctx || this;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      fn.apply(ctx, args);
      timeout = ctx = args = null;
    }, delay);
  };
};
