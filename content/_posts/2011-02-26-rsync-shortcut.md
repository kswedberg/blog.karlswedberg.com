---
date: February 26 2011 23:53:40
title: rsync shortcut
categories: bash
template: post.html
---

The OS X Finder is the undisputed loser in the file management category. What's particularly crazy is that OS X has rsync built into the OS. I can never remember the flags to use for the various rsync options, so I wrote a little bash function:

```bash
function cps() {

  dirname=$1

  trailingslash=`expr $dirname : '\(.*\)/$'`
  if [[ ${trailingslash} == '' ]]; then
    dirname="${dirname}/"
  fi

  OPTIONS="All New Update"

  select OPTION in $OPTIONS
  do
    if [[ $OPTION = "All" ]]
    then
      COPYTYPE="-av"
      break
    fi

    if [[ $OPTION = "New" ]]
    then
      COPYTYPE="-av --ignore-existing"
      break
    fi

    if [[ $OPTION = "Update" ]]
    then
      COPYTYPE="-auv"
      break
    fi

  done


  # echo "You chose ${COPYTYPE}"
  echo "copying ${dirname} to ${2} ..."
  rsync ${COPYTYPE} ${dirname} ${2}
  echo "done!"
}
```
