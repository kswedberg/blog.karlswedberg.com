---
date: March 14 2011 21:24:52
title: Creating a new remote git repo
categories: git
template: post.html
---

It took me a while to track down how to set up a new git repo on my remote server hosted by DreamHost. I imagine that most, if not all, of this stuff probably applies to any shared hosting service. Here's what I have to do — in case I forget:

### One time only

Before I do anything else, I need to make sure that git is installed on the dreamhost server. If it isn't, I need to install it. I can easily find instructions elsewhere, so no need to reproduce them here.

Also, I should have a common location where I can store all my git repos on the server. I'm putting them in `/home/username/git/`, where user name is my actual user name.

### Each new git project

For the following instructions, assume that you've already set up a local git repo. Also, replace `username`, `mydomain`, and `PROJECTNAME` with the appropriate values.

<h4>1. ON LOCAL: SSH into mydomain.com</h4>

```bash
ssh username@mydomain.com
```

<h4>2. ON REMOTE: create new bare remote git directory</h4>

```bash
cd /home/username/git/
mkdir PROJECTNAME.git
cd PROJECTNAME.git
git  init --bare
```

<h4>3. BACK ON LOCAL: cd into local git repo. do an initial commit</h4>

```bash
git push --all ssh://username@mydomain.com/home/username/git/PROJECTNAME.git

git remote add origin ssh://username@mydomain.com/home/username/git/PROJECTNAME.git
git config branch.master.remote origin
git config branch.master.merge refs/heads/master
git fetch
git merge master
```

Combined with the [`rake deploy` command][1], this little git setup makes updating and versioning my blog pretty painless.

#### Hold the phone!

After writing this post, I came across a [really nice explanation][2] that goes into more detail and even shows how to set up a post-receive hook on the remote server. In fact, using a post-receive hook appears more convenient than what I'm doing. I may have to revisit my deployment situation.

[1]: /Rakefile/
[2]: http://toroid.org/ams/git-website-howto
