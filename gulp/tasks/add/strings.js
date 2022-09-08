/* eslint-ignore no-param-reassign */
let pad = function pad(digit) {
  let zero = '';

  if (digit < 10) {
    zero = '0';
  }

  return zero + digit;
};

var builders = {
  date: function buildDate(type) {
    let date = new Date();
    let y = date.getFullYear();
    let m = pad(date.getMonth() + 1);
    let d = pad(date.getDate());
    let hh, mm, ss;

    if (type === 'file') {
      return [y, m, d].join('-');
    }

    hh = pad(date.getHours());
    mm = pad(date.getMinutes());
    ss = pad(date.getSeconds());

    return `${[m, d, y].join('/')} ${[hh, mm, ss].join(':')}`;
  },
  fileName: function fileName(title, extension) {
    title = (title || '').replace(/[^0-9a-zA-z]+/g, '-').toLowerCase();
    extension = (extension || 'md').replace(/^\./, '');
    let base = [builders.date('file'), title].join('-');

    return [base, extension].join('.');
  },
  cats: function cats(cts) {
    cts = cts || '';

    return cts.toLowerCase();
  },
};

module.exports = builders;
