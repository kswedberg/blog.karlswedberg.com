var pad = function pad(digit) {
  var zero = '';

  if (digit < 10) {
    zero = '0';
  }

  return zero + digit;
};

var builders = {
  date: function buildDate(type) {
    var date = new Date();
    var y = date.getFullYear();
    var m = pad(date.getMonth() + 1);
    var d = pad(date.getDate());
    var hh, mm, ss;

    if (type === 'file') {
      return [y, m, d].join('-');
    }

    hh = pad(date.getHours());
    mm = pad(date.getMinutes());
    ss = pad(date.getSeconds());

    return [m, d, y].join('/') + ' ' + [hh, mm, ss].join(':');
  },
  fileName: function fileName(title, extension) {
    title = (title || '').replace(/[^0-9a-zA-z]+/g, '-').toLowerCase();
    extension = (extension || 'md').replace(/^\./, '');
    var base = [builders.date('file'), title].join('-');

    return [base, extension].join('.');
  },
  cats: function cats(cts) {
    cts = cts || '';

    return cts.toLowerCase();
  },
};

module.exports = builders;
