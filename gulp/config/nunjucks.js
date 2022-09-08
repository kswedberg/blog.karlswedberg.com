/* eslint-ignore no-param-reassign */

module.exports = function(env) {
  let replacer = function replacer(key, val) {
    if (typeof val === 'string') {

      val = val

      // left single quote
      .replace(/(^|[\-\u2014\s(\["])'/g, '$1\u2018')

      // right single quote
      .replace(/'/g, '\u2019')

      .replace(/--/g, '\u2014')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    }

    return val;
  };

  /**
   * Filters
   */

  env.addFilter('json_encode', (data) => {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }

    data += '';

    return data;
  });

  env.addFilter('json_encode_attr', (data) => {
    if (typeof data === 'object') {
      return JSON.stringify(data, replacer);
    }

    data += '';

    return data;
  });

  env.addFilter('merge', (tgt, src) => {
    let merged;

    if (Array.isArray(tgt)) {

      src = src || [];
      merged = [].concat(tgt);

      src.forEach((item) => {
        if (merged.indexOf(item) === -1) {
          merged.push(item);
        }
      });

    } else if (typeof tgt === 'object' && typeof src === 'object') {
      merged = Object.assign({}, tgt, src);
    } else {
      merged = tgt;
    }

    return merged;
  });
};
