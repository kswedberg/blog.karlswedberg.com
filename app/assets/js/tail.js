// jscs:disable disallowDanglingUnderscores
var _gaq = window._gaq;

if (!_gaq) {
  _gaq = [
    ['_setAccount', 'UA-22112450-1'],
    ['_trackPageview']
  ];
}

(function(doc) {

  var loadDisqus;
  var dsn = window.disqus_shortname || '';
  var onLoad = function() {};

  var firstScript = doc.getElementsByTagName('script')[0];
  var loadScript = function(id, url) {
    var scr = doc.createElement('script');

    scr.async = true;
    scr.id = id;
    scr.src = url;
    firstScript.parentNode.insertBefore(scr, firstScript);
  };

  loadScript('ganalytics', 'https://www.google-analytics.com/ga.js');

  if (doc.getElementById('disqus_thread')) {

    loadDisqus = function() {
      setTimeout(function() {
        loadScript('disqus-script', 'https://' + dsn + '.disqus.com/embed.js');
      }, 10);
    };

    // In case something else is bound to the window.onload event
    if (typeof window.onload === 'function') {
      onLoad = window.onload;
    }
    window.onload = function() {
      onLoad();
      loadDisqus();
    };
  }

})(document);
