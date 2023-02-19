---
date: Sat Feb 19 2023 15:17:24 GMT-0500 (Eastern Standard Time)
title: Rebuilding the site with Astro
description: After 12 years, I decide to rebuild the site using Astro, a JavaScript-based static site generator
tags: [html, js, astro]
---

When I started this blog 12 years ago, I was playing around a bit with Ruby — mostly dabbling in Rails and fiddling with Rake files — so I figured [Jekyll](https://jekyllrb.com/) would be a good vehicle for continuing my exploration. I loved the idea of writing blog posts in Markdown and having a build task convert everything to HTML, especially since I knew I'd be the only person blogging here and wouldn't need a content management system to support the less technically inclined.

The site worked pretty well, too. It loaded quickly and looked about as okay as you'd expect of something built by a design-challenged developer like myself. But after a couple years of posting sporadically for an audience of maybe a handful of people, I started to lose interest and let the site lay dormant.

## All in with JS

Then in 2015 I came across [Metalsmith](https://metalsmith.io/), another static site generator, but this one written in JavaScript, my programming language BFF. Here was my chance to rebuild the site with the language I loved and, in the process, reignite my blogging flame. Well, I rebuilt it, but I must have lost my matches because I didn't even have a spark of interest in writing anything new.

Now here I am once more, slapping on a fresh new coat of paint. There wasn't anything particularly wrong with Metalsmith, but I hadn't been keeping up with its updates and I was getting tired of seeing all the security warnings that Snyk and dependabot were sending my way, even though I knew they were largely irrelevant. The vulnerabilities exist in an online context, and I only used the tool to build the site on my local machine. That's one of the advantages of a static site, after all.

This latest iteration of the blog is using [Astro](https://astro.build), another JavaScript-based static site generator. I've really enjoyed working with Astro. Most of the process has been pain free with only a few snags along the way. One question that has been dogging me, though, is, "Why didn't I use [Eleventy](https://www.11ty.dev/) instead?" I've heard wonderful things about it, and I think its creator, [Zach Leatherman](https://www.zachleat.com/), is a super great guy. I honestly can't explain what drove me to use Astro. I don't regret it, but I still have that nagging feeling. Anyway, the [new code](https://github.com/kswedberg/blog.karlswedberg.com) is up on Github.

## What I like about Astro

There is a lot to like about Astro. First, the way it continues the tradition of creating URLs from a directory of Markdown files is a relief and a joy. I like its concept of "collections" and the flexibility with which it handles front matter. I could pretty much drop my existing files into a new directory, adjust some configuration, and have a baseline blog running with the new system in a matter of minutes. Second, the hot-module reloading is super fast. I could work on templates, layouts, and styles and receive nearly instantaneous updates in the browser.

The integrations are another terrific aspect of Astro. For this blog I included Tailwind CSS, sitemap, image, and compression integrations. I also initially had the RSS integration installed, but I swapped it out for a [node-based feed generator](https://github.com/jpmonette/feed) that also supports Atom and JSON formats. The site had been using Atom, so I thought it would be rude to my 3 or 4 followers to discontinue that without warning. there is an unofficial Service Worker integration that I've been considering, but I'm not sure it's worth using Service Workers here. It's just a blog, not an app, and it loads incredibly fast. I can't imagine anyone wanting to continue navigating around the site in offline mode or adding it to their home screen, but if people start clamoring for it, I'll reconsider (haha). Astro also has an official Vue integration that I might install and play around with if I decide to build in some interactive elements to the site or write about some of the work I've done with Vue.

Overall I found the Astro documentation helpful and intuitive. I learn best through example, though, so I probably spent more time looking at starter templates and other projects built with Astro, especially [cadecuddy/milkroll](https://github.com/cadecuddy/milkroll) and [onwidget/astrowind](https://github.com/onwidget/astrowind/).

## Struggles

A few aspects of Astro have been harder than others. It seems like it's a Typescript-first framework. I realize Typescript has all sorts of advantages, but I've never quite latched onto the syntax. When I've used it, I've often found myself spending more time getting Typescript to work without complaining and less time writing the thing I'm actually trying to build. But I don't want to get off on a tangent here about Typescript, and I don't want to raise the ire of the legions of Typescript fans, so I'll just say that _for me_ the Typescript focus was a bit of a challenge.

One feature of the site that took far too long to get working was the Markdown "reading time" extension. I saw it done well in the projects that were serving as my inspiration, but for some reason I couldn't get the `readingTime` property to show up in the frontmatter object when I tried to display it in certain places (maybe because I was using a collection?). It probably had to do with the order of processing various components, but I couldn't figure it out. Finally, I noticed that astrowind had its own utility function to create an array of posts, so I borrowed from that and imported that function for all pages (or feeds) that show one or more posts.

I was kind of excited about the Partytown integration, hoping to see how it loaded some third-party JavaScript in a Web Worker for me. Unfortunately, I wasn't able to get it to work.

## Changes

While almost all of the content and most of the site's structure has remained the same, there have been a few changes from the last iteration:

* **Design**: The design is the most noticeable difference. The font size is a bit bigger all around, and the look is a bit fresher, for lack of a better word. Also, it supports dark mode if the user has designated it at the system preference level. I thought about adding a "theme switcher," but decided against it in an attempt to avoid unnecessary complexity. It's hard for me to imagine someone opting into dark mode at the OS level but wanting light mode on this site, or, conversely, wanting dark mode for this site but light mode everywhere else.
* **Metadata**: I've added a number of `<meta>` tags, mostly for Facebook and Twitter, even though I barely use Facebook and I killed my Twitter account last month.
* **Feeds**: As mentioned above, I kept the [Atom](/atom.xml) feed out of solidarity with my loyal users, but I also added [RSS 2.0](/rss.xml) and [JSON](/feed.json) feeds.
* **Comments**: I kept the old clunky Disqus commenting system on the site, but now it is "opt in" only. At the bottom of each blog post, the user now has to click the "Load comments" button to either read or write comments. I did this because I want the initial page load to be fast, most people probably don't care about comments, and Disqus seems to load a crap ton of JavaScript, some of which is probably there to track you. Some day I'll look into a less obnoxious way to have comments on a static site.
