---
date: July 25 2013 09:25:25
title: yeoman, ulimit, and unmet dependency
tags: [js]
---

After installing Yeoman and some generators, I kept seeing a bunch of lines beginning with `npm WARN unmet dependency`. Something was amiss. A quick Google search brought me to a [GitHub issue](https://github.com/yeoman/yeoman/issues/1096) from [a user](https://github.com/linhmtran168) who was having the same problem. The fix, which the OP discovered himself (herself?), is to run this line in the Terminal:

```bash
ulimit -n 10000
```

Once I did that, I just had to install Yeoman (`npm install -g yo`) and my preferred generators again, and my troubles were gone.
