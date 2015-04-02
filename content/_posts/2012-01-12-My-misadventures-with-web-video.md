---
date: January 12 2012 20:55:14
title: My (mis)adventures with web video
template: post.html
categories: html video
---

Over the past few weeks I've run into a number of problems while adding video to web sites as part of my job at [Fusionary][10]. I'm recording them here so I can repeat as few of my mistakes and avoid as many of my previous issues as possible. I also strongly believe that *nobody should have to go through all the pain that I've gone through to get video to work consistently on the web*. I'll be adding to this blog post as I run across more problems.

### Embedded YouTube Videos in a Lightbox
While most of the issues involve video served from the same site as the document, at least one problem appeared with YouTube videos shown in a lightbox. At some point I had to add `?wmode=transparent` to the iframe's `src` because the close button was appearing behind the video. However, in IE9 (maybe 64-bit mode only), `wmode=transparent` rendered the video as a solid black background. The controls appeared, the audio played, but no video. The workaround I came up with involved checking for an "ie9" class added to the `html` element with a conditional comment. Then, I'd add the `wmode=transparent` query param to a link's `href` (which was later used to build the YouTube iframe) if that class wasn't there. Here is what it sort of looked like:

```js
  var wmode = /ie9/.test(document.documentElement.className) ? '' : 'wmode=transparent';

  if ( wmode ) {
    $('a.yt-link').prop('href', function(i, val) {
      val += this.search ? '&' : '?';
      return val += wmode;
    });
  }
```

### HTML5 Video with a Flash "fall-through"
The embedded YouTube issue was certainly interesting, but it was only a momentary diversion from the real (mis)adventures with web video. For most recent projects, I've been using the now-classic [Video for Everybody][12] markup popularized by Croc Kamen:
```html
<video id="video-1" src="/videos/test.mp4"
    poster="/img/video-still.jpg"
    width="480" height="320">
  <source type="video/mp4" src="/videos/test.mp4">
  <source type="video/webm" src="/videos/test.webm">
  <object type="application/x-shockwave-flash"
      data="/assets/swf/flashmediaelement.swf">
    <param name="movie" value="/assets/swf/flashmediaelement.swf">
    <param name="flashvars" value="controls=true&amp;file=/videos/test.mp4">
    <img src="/img/no-vid.png" title="No video playback capabilities">
  </object>
</video>
```

The one exception is that I'm not including an .ogv file, because Firefox 3.6 is the only browser I somewhat care about that could use it—and couldn't use .webm—and I don't mind giving it the Flash fall-through.

Along with this markup, I've been including the [mediaelement.js][5] script, which provides a consistent, cross-browser UI with HTML5-first video and a Flash "fall-through." When a browser can't play native HTML5 video, the mediaelement.js script attempts to play the .mp4 video using Flash. This kind of thing is essential for reducing the amount of code forking I need to do while still letting <abbr title="Internet Explorer 8">IE8</abbr> and below users see videos, too.

### Video Files and Server Configuration (.htaccess)
I know enough not to run into this problem when I start a project, but I sometimes forget to make sure everything is set up correctly when I jump into a project midstream to add video.

**Problem:** HTML5 video won't play at all unless they are served correctly.

**Solution 1:** If you're running an Apache server, set the proper MIME type for video files in the site's .htaccess file:

```apache
  # video
  AddType video/ogg                      ogv
  AddType video/mp4                      mp4 m4v
  AddType video/webm                     webm
```

**Solution 2:** Make sure that the server is not compressing (with gzip/deflate, etc.) those video files.

### HTML5 Video with Varnish
**Problem:** We've been using [Varnish Cache][4] on a few sites and have been very impressed with the performance boost it has provided. Unfortunately, it doesn't play well with large video files. As soon as we turned Varnish on, the videos stopped working. Firefox showed NaN/NaN for the timeline, and other browsers just showed 00:00. It was as if the videos' metadata couldn't be read.

**Solution:** Once we discovered what was going on, our super-duper server guy set up another port to serve the files without Varnish, and I set up a redirect for .webm and .mp4 files to point to the other port.

### IE8, Flash Fall-through, and F12 Developer Tools
**Problem:** Testing video playback in IE8 was a nightmare for a number of reasons. The worst of it had to do with the seemingly random breakage of video—another case of the black background for video while audio carries on its merry way.

**Solution:** Make sure the F12 Developer Tools are turned off.

**Unsolved Mystery:** I'm still not sure how to test video using Windows 7 and IE9 in IE8-compatibility mode, since that requires having the Developer Tools open. Anyone know of a workaround?

### Codec Issues with mp4 files
**Problem:** The videos weren't working in all webkit browsers.

**Solution:** Make sure .mp4 files are encoded as H.264, not FFMpeg/MPEG-4.

### mediaelement.js and the Flash plugin path
This one was my fault, but not immediately obvious. The mediaelement.js script is awesome, but in this one particular case, it's too awesome for me. When used as a jQuery plugin, the mediaelement player can be invoked like so:

```js
  $('video').mediaelementplayer();
```

**Problem:** By default, mediaelement.js assumes that the plugin is in the same path as the mediaelement.js file. If scripts are placed in a different folder on the production site (due to concatenating/minifying/caching, etc.), this awesome feature that works in the dev environment will no longer work when the site is live.

**Solution:** Explicitly set the `pluginPath` option. For example (set it to the actual path on your own site):

```js
$('video').mediaelementplayer({
  pluginPath: '/assets/scripts/lib/mediaelement/'
});
```

### Progressively downloading mp4 files through Flash
**Problem:** I was having a vexing problem in that the entire video had to load before it would start playing. It turns out that the video encoders I had been using, at least with the settings I had on them, were putting the "moov atom" at the end of the .mp4 file. This moov atom is the metadata contains the index for the entire file, and Flash needs to read it before it can start progressively loading (buffering) the video. Unfortunately, when the metadata is at the end of the file, Flash needs to download the whole thing before it can get to that information. So, I had to somehow get the moov atom to the beginning of the file.

**Solution 1, QTIndexSwapper:** This is one of those things that I never would have known if I hadn't hit upon the magic combination of google words ([can flash buffer mp4 files][1]), which brought me to [a blog post that laid it all out][2]. Most of the advice in that post wasn't relevant to my needs, but this part saved my bacon:

> Fortunately, Renaun Erickson over at Adobe has created a simply little AIR utility to fix this atom feed placement&hellip;: a program called "[QTindexswapper][3]".

**Solution 2, moovrelocator** Once I knew I could search for [mp4 moov atom][6] I found a PHP class that also claims to "move the moov." (I say "claims" only because I haven't tested it; I have no reason to doubt that it does what it says it does.) I may explore this option more later.

**Solution 3, Handbrake:** One of those video encoders that put the moov atom in the wrong place for me was [Handbrake][9]. Now I know that it *can* put it at the start of the file if you check the *Web optimized* checkbox. However, the meaning of "Web optimized" wasn't clear to me, and *none of the Handbrake presets have it checked by default.* Seems obvious looking at it now, but when grasping at straws and having to consider Flash, Internet Explorer, JavaScript, HTML, VMWare, hardware acceleration, and other codec conundrums (FFMpeg, H.264, Frame rate, bitrate, etc.), it's easy to dismiss a checkbox like this as "something that will probably degrade video quality."

![Handbrake settings][8]

I saved a custom preset in Handbrake that I now use for converting to mp4, starting with the iPhone 4 preset and unchecking "Large File Size" and checking "Web optimized."

### IE9, VMWare, and Hardware Acceleration
**Problem:** No HTML5 video in IE9 when loaded in a virtual machine.

**Solution:** In VMWare Fusion, go to the Settings panel of the virtual machine running Windows 7. Choose *Display* and uncheck "Accelerate 3D Graphics"

![VMWare Display Settings - 3D Disabled][11]

### Conclusion
There are many opportunities to break video on the web. Have you come across any other problems? If you have any horror stories, cautionary tales, or success stories you'd like to share, please add a comment.

[1]: http://www.google.com/search?ie=UTF-8&q=can+flash+buffer+mp4+files
[2]: http://www.blogstitution.com/2010/08/universal-flash-ipod-video-codec-using-imovie-html5/
[3]: http://renaun.com/blog/code/qtindexswapper/
[4]: https://www.varnish-cache.org/
[5]: http://mediaelementjs.com/
[6]: http://www.google.com/search?ie=UTF-8&q=mp4+moov+atom
[7]: http://code.google.com/p/moovrelocator/
[8]: /assets/img/handbrake.png
[9]: http://handbrake.fr/
[10]: http://www.fusionary.com/
[11]: /assets/img/no-accelerated-graphics.png
[12]: http://camendesign.com/code/video_for_everybody
