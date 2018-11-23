---
title: 'Installing PHPUnit on Ubuntu Linux'
date: '2011-11-11T11:50:34.000Z'
tags: ['code', 'linux', 'php', 'phpunit', 'testing', 'ubuntu']
author: 'jesstelford'
---

To install PHPUnit, there are two direct dependencies which first need to be installed;

- PEAR
- Xdebug

As Xdebug also depends on PEAR, we'll make sure that's installed first.

## Installing PEAR

My source-compiled version of PHP is installed at `/usr/local/php`, so we'll first jump into that directory;

```
$ cd /usr/local/php
```

Now, following the instructions for [Installing PEAR](http://pear.php.net/manual/en/installation.getting.php), I opted to download the installation script and run it locally;

```
$ wget -c http://pear.php.net/go-pear
$ ./bin/php go-pear
```

All the default settings should be fine, so go ahead and finish installing PEAR.

## Installing Xdebug

As per the [Installation Instructions](http://www.xdebug.org/docs/install), stay in the same directory and run the following;

```
./bin/pecl install xdebug
```

Again, follow the installation through to the end, and it should have installed the xdebug.so library into the libs/extensions directory. On my machine, it put it at `/usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/xdebug.so` (don't ask me why...) Now, we have to add this module to PHP by editing the php.ini file. Fire up your favourite text editor, point it to `/usr/local/php/lib/php.ini` and add the following line;

```
zend_extension="/usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/xdebug.so"
```

Restart (or start) your server (I'm using apache installed at `/usr/local/apache2`, so I did `$ /usr/local/apache2/bin/apachectl -k restart`). Get a phpinfo() call, and you should have both "PEAR" and "Xdebug" listed on the page. So far, so good.

## Installing PHPUnit

From [PHPUnit's manual](http://www.phpunit.de/manual/current/en/installation.html), run the following commands;

```
$ ./bin/pear channel-discover pear.phpunit.de
$ ./bin/pear channel-discover components.ez.no
$ ./bin/pear channel-discover pear.symfony-project.com
$ ./bin/pear install phpunit/PHPUnit
```

For some reason this one took quite a while (1 minute) to begin, but once it did, it went quick and installed PHPUnit to `/usr/local/php/PEAR/PHPUnit`. Et voilà. Start [writing tests for PHPUnit](http://www.phpunit.de/manual/current/en/writing-tests-for-phpunit.html)!
