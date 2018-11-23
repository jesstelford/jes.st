---
title: 'TextMate-like snippets in Vim with SnipMate'
date: '2011-11-11T11:53:33.000Z'
tags: ['coding', 'productivity', 'snipmate', 'snippets', 'vim']
author: 'jesstelford'
---

Using snippets to save on development time is always one of those "I'll do it soon" tasks that I see everyone else doing but never get around to myself. I took the plunge. You should too. Here are simple to follow instructions to install SnipMate in Vim. The snippets use a TextMate Snippets-like syntax, so there's a wealth of snippets out there and you can start creating your own straight away! Go;

1.  Follow the instructions for using [VAM to install SnipMate](https://github.com/MarcWeber/snipmate.vim#id7);
    1.  [Install VAM.](https://github.com/MarcWeber/vim-addon-manager/blob/master/doc/vim-addon-manager.txt#L64)
    2.  Edit your `~/.vimrc` file; `$ vim ~/.vimrc`, and change the line
        ```
        call vam#ActivateAddons(\["github:YourName"\],{'auto_install' : 0})
        ```
        to
        ```
        call vam#ActivateAddons(\["snipMate"\],{'auto_install' : 0})
        ```
        Note that the capitalization of "snipMate" is important.
    3.  Close and restart Vim
    4.  Select "Y" to install snipMate
    5.  Select "Y" twice more when prompted to install the two dependencies
2.  You're done installing SnipMate - easy, huh?

Now, [watch a screencast](http://vimeo.com/3535418) explaining it. Enjoy :)
