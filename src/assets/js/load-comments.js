
(function(doc) {


  // @ts-ignore
  const dsn = window.disqus_shortname || '';
  const firstScript = doc.getElementsByTagName('script')[0];
  const commentBtn = doc.getElementById('comment-btn');
  const jsPreComment = doc.querySelector('.js-comments');
  const disqusWrapper = doc.getElementById('disqus_thread');

  const loadScript = function(id, url) {
    const scr = doc.createElement('script');

    scr.defer = true;
    scr.id = id;
    scr.src = url;
    firstScript.parentNode.insertBefore(scr, firstScript);
  };

  jsPreComment.classList.remove('hidden');

  const loadDisqus = function(event) {
    event.preventDefault();
    // This is the loading indicator:
    const hid = disqusWrapper.querySelector('.hidden');

    if (hid) {
      hid.classList.remove('hidden');
    }

    loadScript('disqus-script', `https://${dsn}.disqus.com/embed.js`);
    jsPreComment.parentNode.removeChild(jsPreComment);
  };

  if (disqusWrapper && commentBtn) {
    commentBtn.addEventListener('click', loadDisqus);
  }

  const addShare = () => {
    const tagsWrapper = document.querySelector('.tags-wrapper');
    const canon = document.querySelector('link[rel="canonical"]');
    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    let shareData = {
      title: ogSiteName.getAttribute('content'),
      text: ogTitle.getAttribute('content'),
      url: canon.getAttribute('href'),
    };

    if (!tagsWrapper || !navigator.canShare || !navigator.canShare(shareData)) {
      return console.log(tagsWrapper);
    }

    const share = async() => {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    const shareBtn = document.createElement('button');

    shareBtn.type = 'button';
    shareBtn.className = 'mt-8 px-2 py-0.5 rounded border text-sky-800 border-sky-800 dark:text-slate-200 dark:border-slate-200 hover:text-sky-900 dark:hover:text-white';
    shareBtn.textContent = 'Share this post';

    shareBtn.addEventListener('click', share, false);
    tagsWrapper.insertAdjacentElement('afterend', shareBtn);
  };

  addShare();

})(document);
