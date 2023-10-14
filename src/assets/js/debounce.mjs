export const debounce = function debounce(fn, timerDelay, ctx) {
  const delay = timerDelay === undefined ? 200 : timerDelay;
  let timeout;

  return function(...args) {
    const context = ctx || this;

    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      fn.apply(context, args);
      timeout = null;
    }, delay);
  };
};
