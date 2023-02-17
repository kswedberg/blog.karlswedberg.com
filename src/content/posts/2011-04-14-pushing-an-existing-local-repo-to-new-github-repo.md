---
date: April 14 2011 18:00:36
title: pushing an existing local repo to new github repo
tags: [git]
---

I usually start my projects with a local git repo and then at some later date decide to put it up on [github.com][1]. That's usually a no-brainer if I'm the one who creates the remote repo; GitHub provides clear instructions on the very next page. But if the project is for work and someone else has already created an empty remote repo, I don't get to see those instructions. So, here's what I need to do:

  ```bash
   cd ~/Sites/local-repo-dir

   git remote add origin git@github.com:fusionary/remote-repo-name.git

   git push -u origin master
  ```


[1]: http://github.com/
