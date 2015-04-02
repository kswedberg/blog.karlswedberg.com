---
date: July 07 2011 22:51:46
title: Forcing MS Office files to download
template: post.html
categories: apache
---

Every time clients start putting up links to Microsoft Office files on their sites, I'm sent scrambling around my hard drive with a `find ~/Sites -name ".htaccess" -exec grep "ms-word" '{}' \; -print` command or searching the googles for `htaccess force download ms-word`. Fortunately, it doesn't take too long to find what I'm looking for:

    ```apache
    AddType application/vnd.ms-word.document.macroEnabled.12 .docm
    AddType application/vnd.openxmlformats-officedocument.wordprocessingml.document docx
    AddType application/vnd.openxmlformats-officedocument.wordprocessingml.template dotx
    AddType application/vnd.ms-powerpoint.template.macroEnabled.12 potm
    AddType application/vnd.openxmlformats-officedocument.presentationml.template potx
    AddType application/vnd.ms-powerpoint.addin.macroEnabled.12 ppam
    AddType application/vnd.ms-powerpoint.slideshow.macroEnabled.12 ppsm
    AddType application/vnd.openxmlformats-officedocument.presentationml.slideshow ppsx
    AddType application/vnd.ms-powerpoint.presentation.macroEnabled.12 pptm
    AddType application/vnd.openxmlformats-officedocument.presentationml.presentation pptx
    AddType application/vnd.ms-excel.addin.macroEnabled.12 xlam
    AddType application/vnd.ms-excel.sheet.binary.macroEnabled.12 xlsb
    AddType application/vnd.ms-excel.sheet.macroEnabled.12 xlsm
    AddType application/vnd.openxmlformats-officedocument.spreadsheetml.sheet xlsx
    AddType application/vnd.ms-excel.template.macroEnabled.12 xltm
    AddType application/vnd.openxmlformats-officedocument.spreadsheetml.template xltx
    ```

I suppose I could set them all to `application/octet-stream` or some such if I truly wanted to force the download, but I'm pretty sure that doing it the long way will allow the user to choose whether to open the file in the appropriate Office Application or save it. In any case, the clients seem to love it. Microsoft Word to your mother!
