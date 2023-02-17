---
date: October 13 2012 16:23:20
title: Cleaning up dead git branches
tags: [git]
---

At [Fusionary](http://fusionary.com), we create a lot of feature branches in git to isolate what we're
working on, and then we merge those branches into either the dev or master branch to prepare to deploy the changes. The system works very well, except that some projects seem to spawn a ton of old feature branches that get left out to rot. It's hard to know sometimes what to do with them, since we're not always entirely organized about such things.

The other day my coworker Ed showed me a super neat git trick for finding out which branches we can delete when we want to do a little housekeeping:

```bash
# on the command line:
git branch --merged
```

If I had read the manual, I would have known this already; at the very end of the help for `git branch` these two lines appear:

> * `--merged` is used to find all branches which can be safely deleted, since those branches are fully contained by `HEAD`.
> * `--no-merged` is used to find branches which are candidates for merging into `HEAD`, since those branches are not fully contained by `HEAD`.

Nice.
