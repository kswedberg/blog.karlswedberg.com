---
date: March 16 2011 16:55:52
title: Media query detection
tags: [links, js, css]
---

[This gist][1] from Nicholas C. Zakas looks really handy:

> This function determines if the browser is currently in a particular media media mode. Use the same media query as you would in CSS or on a `<link>` element.

I can see myself using it quite a bit. His usage examples look like this:

```js
if (isMedia("screen and (max-width:800px)"){
    //do something for the screen
}

if (isMedia("all and (orientation:portrait)")){
    //react to portrait mode
}
```

I'm thinking it might be even more useful for me to detect `!isMedia('something)` and fallback to js stuff in those cases. Not sure yet. Still need to ponder.

[1]: https://gist.github.com/08602e7d2ee448be834c
