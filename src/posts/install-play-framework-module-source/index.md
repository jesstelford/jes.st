---
title: 'Install a Play Framework module from source'
date: '2011-11-11T11:57:13.000Z'
tags: ['code', 'coding', 'module', 'play framework', 'the web']
author: 'jesstelford'
---

The [Play Framework](http://www.playframework.org) provides a great flexible Module system whereby any stand-alone code can be separated entirely from your main application. There are a number of pre-build and ready to go modules available [here](http://www.playframework.org/modules). What if you want to check one out from github or googlecode and use it from source? Unfortunately, the Play Framework documentation on this is very sparse, so here's how:

## Get your Play Module

Checkout your module from github or googlecode, etc. For example, I wanted to use the [Google App Engine module from github](https://github.com/guillaumebort/play-gae):

```
$ cd /path/to/play/modules
$ git clone https://github.com/guillaumebort/play-gae.git
$ mv play-gae gae
```

Now the module is available in /path/to/play/modules/gae .

## Compile your Play Module

Now you need to 'build' the module so it's ready for the Play Framework. This will also create a distributable .zip file, but we're not interested in that.

```
$ cd gae
$ play build-module
```

Answer the questions about the version of the module and the required version of Play Framework. The build process output should look something like;

```
~        _            _
~  _ __ | | __ _ _  _| |
~ | '_ \\| |/ _' | || |_|
~ |  __/|_|\\____|\\__ (_)
~ |_|            |__/
~
~ play! 1.1, http://www.playframework.org
~
~ What is the module version number? 1.5
~ What are the playframework versions required? 1.1
~
~ Building...
~
Buildfile: /path/to/play/modules/gae/build.xml

checkVersion:

compile-java6:
     \[echo\] Disabling annotation processing
    \[javac\] Compiling 6 source files to /usr/local/play/play-1.1/modules/gae/tmp/classes

compile-java5:

build:
     \[copy\] Copying 2 files to /path/to/play/modules/gae/tmp/classes
      \[jar\] Building jar: /path/to/play/modules/gae/lib/play-gae.jar
   \[delete\] Deleting directory /path/to/play/modules/gae/tmp

BUILD SUCCESSFUL
Total time: 4 seconds
~
~ Packaging gae-1.5 ...
~
~ Done!
~ Package is available at /usr/local/play/play-1.1/modules/gae/dist/gae-1.5.zip
~
```

## Tell your application about the module

You have to let your application know about the module and its location by editing the /path/to/your/app/conf/application.conf file, and adding the following line:

```
module.gae=${play.path}/modules/gae
```

## Test and enjoy

Now when you run your application, the module should be recognised and loaded. Keep in mind that each time you make a source code change to your module, you'll have to do the [compile step](#compile) again. Enjoy!
