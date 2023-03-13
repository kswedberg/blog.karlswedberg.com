/**
 * "Promised `each()`" for iterating over an array of items, calling a function that returns a promise for each one. So, each one waits for the previous one to resolve before being called
 * @function peach
 * @param {array} arr Array to iterate over
 * @param {ArrayCallback} fn Function that is called for each element in the array, each returning a promise
 * @returns {Array.<Promise>} Array of promises
 */
export const peach = (arr, fn) => {
  const originalArray = [...arr];
  const funcs = arr.map((item, i) => {
    return () => fn(item, i, originalArray);
  });

  // @ts-ignore
  return funcs.reduce((promise, func) => {
    return promise
    .then((result) => {
      const called = func();
      // If the function doesn't return a "then-able", create one with Promise.resolve():

      return (called && typeof called.then === 'function' ? called : Promise.resolve(called))
      .then([].concat.bind(result));
    });

  }, Promise.resolve([]));
};
