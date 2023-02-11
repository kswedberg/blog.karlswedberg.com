---
date: November 03 2013 09:47:24
title: HTML5's Web * Features
url: html5-web-asterisk-features
tags: [js, html]
---

One thing I've noticed about HTML5 features is that a lot of them start with the word "Web."  Also, some of them have slightly overlapping uses. This makes it difficult for me to remember which is which. I have the same problem when I meet a bunch of people who have the same basic body type and face shape. It's hard for me to tell one from the others. What follows is a cheat sheet for myself, an attempt to keep these APIs straight so I don't fumble around in my head the next time I need to pick one up.

### Web Sockets

Two-way open connections for sending/receiving data.

They are more full-featured and robust than Server-Sent Events (SSE) in that SSE go one way: from server to browser. While Web Sockets are supported by more browsers than SSE are, they can't be polyfilled and need special server setup. SSE, on the other hand, can be polyfilled and are sent over simple http. If all you need is to send messages (typically as strings) across domains or from frame to frame, you might be better off using `onmessage`/`postMessage`.

* [W3C Spec](http://www.w3.org/TR/websockets/)
* [html5rocks article](http://www.html5rocks.com/tutorials/eventsource/basics/)
* [Introduction by Robert Nyman](http://robertnyman.com/2010/10/22/introducing-html5-web-sockets-taking-bidirectional-communication-on-the-web-to-the-next-level-2/)
* **Support**: [Modern browsers and IE10+; not Android Browser](http://caniuse.com/#feat=websockets)

### Web Workers

Allow developers to run computationally intensive processes in background threads so they don't lock up the browser/UI.

This gets around the single-threaded nature of JavaScript.

* [W3C Spec](http://www.w3.org/TR/workers/)
* [MDN article](https://developer.mozilla.org/En/Using_web_workers)
* [html5rocks article](http://www.html5rocks.com/en/tutorials/workers/basics/) (provides good use cases)
* **Support**: [Modern browsers and IE10+; not Android Browser](http://caniuse.com/#feat=webworkers)

### Web Components

The W3C's [Introduction to Web Components](http://www.w3.org/TR/2013/WD-components-intro-20130606/) lays it all out:


  > The component model for the Web ("Web Components") consists of five pieces:
  >
  > 1. **Templates**, which define chunks of markup that are inert but can be activated for use later.
  > 2. **Decorators**, which apply templates based on CSS selectors to affect rich visual and behavioral changes to documents.
  > 3. **Custom Elements**, which let authors define their own elements, with new tag names and new script interfaces.
  > 4. **Shadow DOM**, which encapsulates a DOM subtree for more reliable composition of user interface elements.
  > 5. **Imports**, which defines how templates, decorators, and custom elements are packaged and loaded as a resource.


* The [Polymer Project](http://www.polymer-project.org/), currently in Pre-Alpha, implements Web Components in its "Elements (UI)" modules. Support is limited to the latest version of self-updating browsers.
* Mozilla's' [Brick](http://mozilla.github.io/brick/), "UI Components for Modern Web Apps," currently aims to provide better browser support than Polymer does. Most components are designed to work in IE9+ and Grade A mobile browsers.
* The Ember framework has a components module, as well. According to the [Ember Components Guide](http://emberjs.com/guides/components/), "Ember's implementation of components hews as closely to the Web Components specification as possible. Once Custom Elements are widely available in browsers, you should be able to easily migrate your Ember components to the W3C standard and have them be usable by other frameworks."

### Web Storage

Allows data to be set and retrieved on the local storage (`window.localStorage`) and session storage (`window.sessionStorage`) objects.

It can be used when capacity requirements are too great for cookies to handle. Unlike cookies, Web (or DOM) Storage allows the storing of objects, not just strings. Also unlike cookies, Web Storage does not have a built-in expiration mechanism (other than `sessionStorage`), so if you need that you'll have to roll your own by adding an expiration timestamp property when setting and checking it against the current time when getting.

* [diveintohtml5](http://diveintohtml5.info/storage.html)
* **Support**: [Modern browsers and IE8+](http://caniuse.com/#feat=namevalue-storage)


### Web Notifications

Notices that a web page can send outside of the browser at the system level so the user will see them even if the browser isn't the currently active app.

Not to be confused with [Web Messaging](http://www.w3.org/TR/webmessaging/) (`onmessage`, `postMessage`, et al).

* [W3C Spec](http://www.w3.org/TR/notifications/)
* [html5rocks tutuorial](http://www.html5rocks.com/tutorials/notifications/quick/)
* [MDN article](https://developer.mozilla.org/en-US/docs/WebAPI/Using_Web_Notifications)
* **Support**: [Current Chrome, Firefox, Safari; no IE as of 11](http://caniuse.com/#feat=notifications)

### WebRTC

**R**eal-**T**ime **C**ommunication for the web, without the need for plugins.

It looks really cool, but it's still early days (as of November 3, 2013).

* [W3C Spec](http://www.w3.org/TR/webrtc/#peer-to-peer-connections)
* **Support**: [Prefixed Chrome and Firefox; no IE as of 11; virtually no mobile](http://caniuse.com/#feat=notifications)

### WebGL

Hardware-accelerated canvas graphic API.

Notably, WebGL is the only feature listed here that is not under the auspices of the W3C. It comes instead from the [Khronos Group](http://www.khronos.org/webgl/). So, it's not technically an HTML5 feature. It's also beyond my understanding.

* [Khronos Spec](http://www.khronos.org/webgl/)
* **Support**: [Modern browsers and IE 11+](http://caniuse.com/#feat=webgl), as long as the user has up-to-date video drivers.

### Web SQL

A deprecated spec for indexed web storage, so don't use it.

Instead, use Web Storage (described above) or IndexedDB. If Safari support is required, you'll
need to use a [polyfill](https://github.com/axemclion/IndexedDBShim).
