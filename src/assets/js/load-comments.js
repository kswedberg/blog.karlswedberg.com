
(function(doc) {


  // @ts-ignore
  const dsn = window.disqus_shortname || '';
  const firstScript = doc.getElementsByTagName('script')[0];
  const commentBtn = doc.getElementById('comment-btn');
  const disqusWrapper = doc.getElementById('disqus_thread');
  const loadScript = function(id, url) {
    const scr = doc.createElement('script');

    scr.defer = true;
    scr.id = id;
    scr.src = url;
    firstScript.parentNode.insertBefore(scr, firstScript);
  };

  commentBtn.classList.remove('hidden');
  const loadDisqus = function(event) {
    event.preventDefault();
    const hid = disqusWrapper.querySelector('.hidden');

    if (hid) {
      hid.classList.remove('hidden');
    }
    loadScript('disqus-script', `https://${dsn}.disqus.com/embed.js`);
    commentBtn.parentNode.removeChild(commentBtn);
  };

  if (disqusWrapper && commentBtn) {


    commentBtn.addEventListener('click', loadDisqus);
  }

})(document);
