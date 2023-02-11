---
date: March 19 2011 10:53:03
title: Another media query detection script
tags: [js, links]
---

After I [linked][1] to a Media Query detection script written by Nicholas Zakas, Paul Irish pinged me to let me know about [a gist he adapted from Scott Jehl][2]. This one looks even cooler. It takes advantage of the new [matchMedia][3] function when it's available, and defines its own when the native one isn't there:

```js
if ( !(window.matchMedia) ){

  window.matchMedia = (function(doc,undefined){

  // ... lots of stuff ...

  })(document);

}
```

Here's the cool thing: That matchMedia function is immediately invoked. Now, why should that happen? Isn't the point of this thing to invoke it when I, as its consumer, want to call it from somewhere? Yep. But, it's not ready for me just yet. inside that function *it's returning another function*, which can then be called whenever I do `matchMedia(mymediaquery)`:

```js
if ( !(window.matchMedia) ){

  window.matchMedia = (function(doc,undefined){
    // ... prep work ...

    return function(q){
      // ... other stuff ...
    };

  })(document);

}
```

There is also some result caching going on in there, so if you repeat the function call with the same argument, it won't do the work of figuring out support each time; instead, after the first time it'll just use the result it stored in the cache.

Very fun and cool stuff!

[1]: http://blog.karlswedberg.com/2011-03-16-Media-query-detection.markdown
[2]: https://gist.github.com/786768
[3]: http://dev.w3.org/csswg/cssom-view/#dom-window-matchmedia
