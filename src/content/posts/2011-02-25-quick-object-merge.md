---
date: February 25 2011 00:38:37
title: quick object merge
tags: [js]
---

Sometimes I load a small init.js file in the `<head>` and load all the other scripts before the closing `<body>` tag, and it's nice to have a few utility functions. This is one of those functions I use every now and then:

```js
var FM = FM || {};

(function() {

  // utility function to merge objects.
  FM.extend = function() {
    var args = Array.prototype.slice.call( arguments ),
        al = args.length,
        firstArg = al === 1 ? FM : args.shift();

    while (--al > -1) {
      var arg = args[al];
      if (typeof arg  == 'object') {
        for (var prop in arg) {
          firstArg[ prop ] = arg[ prop ];
        }
      }
    }

    return firstArg;
  };

})();
```
