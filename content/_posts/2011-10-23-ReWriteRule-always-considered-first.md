---
date: October 23 2011 10:58:55
title: ReWriteRule always considered first
template: post.html
categories: apache
---
So much of Apache's <i>mod_rewrite</i> is a mystery to me that I wonder if I'll ever be able to write anything but the most basic ruleset without multiple trials and errors. Today, though, I stumbled upon a nice bit of information in <i>Apache Cookbook</i> by Ken Coar and Rich Bowen that I'm sure will come in handy next time I start hacking away in the <i>.htaccess</i> file.

The authors present this snippet for giving users their own web space on a server:

```apache
ReWriteEngine On
RewriteCond "/home/$1/public_html"
RewriteRule "/([^/]+)/(.*)" "home/$1/public_html/$2"
```

While I doubt I'll ever need to use that exact ruleset, this paragraph in the "Discussion" section — especially the part that I mark in bold — has helped, more than anything else I've read, to reduce my bewilderment over <i>mod_rewrite</i>:

> This rewrite ruleset takes advantage of a little-known fact about <i>mod_rewrite</i> — in particular, that <strong>a <i>RewriteRule</i> is always considered first, and, if it matches, the <i>RewriteCond</i> is evaluated after that</strong>. Consequently, we can use `$1` in the <i>RewriteCond</i> , even though the value of that variable is set in the <i>RewriteRule</i> appearing on the following line.

### Note to self

Commit this to memory: The <i>RewriteRule</i> is always considered first!
