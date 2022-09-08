let setHeaders = (xhr, headers = {}) => {
  for (let h in headers) {
    xhr.setRequestHeader(h, headers[h]);
  }
};

let setContentType = (xhr, dataType) => {
  let types = {
    json: {'Content-Type': 'application/json'},
  };

  if (!dataType || !types[dataType]) {
    return;
  }

  setHeaders(xhr, types[dataType]);
};

let processResponse = (xhr, opts) => {
  if (opts.dataType === 'json' && typeof xhr.response === 'string') {
    xhr.response = JSON.parse(xhr.response);
  }

  return xhr;
};

let removeListeners = (xhr, events, handlers) => {
  events.forEach((event) => {
    xhr.removeEventListener(event, handlers[event]);
  });
};

export let ajax = function(url, options = {}) {
  let opts = Object.assign({
    method: 'GET',
    dataType: '',
  }, options);
  let events = ['load', 'error', 'abort'];

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let handlers = {
      error: function(err) {
        removeListeners(xhr, events, handlers);
        reject(err);
      },
      abort: function() {
        removeListeners(xhr, events, handlers);
        const err = new Error('Request aborted');
        const error = Object.assign({}, err, {name: 'AbortError', xhr: xhr, cancelled: true, reason: 'aborted'});

        reject(error);
      },
      load: function() {
        removeListeners(xhr, events, handlers);

        if (xhr.status >= 400) {
          return reject(xhr);
        }

        return resolve(processResponse(xhr, opts));
      },
    };

    events.forEach((event) => {
      xhr.addEventListener(event, handlers[event]);
    });

    // @ts-ignore
    xhr.responseType = opts.dataType;
    xhr.open(opts.method, url);

    setContentType(xhr, opts.dataType);
    // @ts-ignore
    setHeaders(xhr, opts.headers);

    xhr.send();
  });
};
