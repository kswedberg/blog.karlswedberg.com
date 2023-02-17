// jscs:disable disallowDanglingUnderscores
// @ts-ignore
let _gaq = window._gaq;

if (!_gaq) {
  _gaq = [
    ['_setAccount', 'UA-22112450-1'],
    ['_trackPageview'],
  ];
}

(function(doc) {

  let loadDisqus;
  // @ts-ignore
  let dsn = window.disqus_shortname || '';
  let onLoad = function() {/* no-op */};

  let firstScript = doc.getElementsByTagName('script')[0];
  let loadScript = function(id, url) {
    let scr = doc.createElement('script');

    scr.async = true;
    scr.id = id;
    scr.src = url;
    firstScript.parentNode.insertBefore(scr, firstScript);
  };

  loadScript('ganalytics', 'https://www.google-analytics.com/ga.js');

  if (doc.getElementById('disqus_thread')) {

    loadDisqus = function() {
      setTimeout(() => {
        loadScript('disqus-script', `https://${dsn}.disqus.com/embed.js`);
      }, 10);
    };

    // In case something else is bound to the window.onload event
    if (typeof window.onload === 'function') {
      // @ts-ignore
      onLoad = window.onload;
    }
    window.onload = function() {
      onLoad();
      loadDisqus();
    };
  }

})(document);
