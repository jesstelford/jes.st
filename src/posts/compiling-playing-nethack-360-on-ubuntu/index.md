---
title: 'Compiling / playing nethack 3.6.0 on Ubuntu or Debian'
date: '2015-12-26T10:22:39.000Z'
tags:
  [
    'coding',
    'debian',
    'games',
    'linux',
    'nethack',
    'roguelike',
    'terminal',
    'ubuntu',
  ]
author: 'jesstelford'
---

_UPDATE: Instructions added for enabling the <code>hilite_status</code> feature to get nice coloured Hitpoint & Hunger highlighting_

> After a 10+ year hiatus, the NetHack DevTeam is happy to announce the release of NetHack 3.6, a combination of the old and the new.

\- _[nethack 3.6.0 release notes](http://www.nethack.org/v360/release.html)_

It took me a while to figure out how to actually get nethack v3.6.0 running on Ubuntu, so I've shared what I learned for others.

<a href="http://jes.st/2015/compiling-playing-nethack-360-on-ubuntu/#comment-141324">Thanks to Jochen</a>, we can also get this compiling on Debian Jessie.

## Get setup

- Install the dependencies
- `sudo apt-get install flex bison build-essential libncurses5-dev checkinstall`
- [Get the source](http://www.nethack.org/v360/download-src.html)
- Extract the source
- `tar xpvzf nethack-360-src.tgz`

## Prepare the source

- Edit `include/unixconf.h`
- Change `/* #define LINUX */` to `#define LINUX`
- Edit `sys/unix/hints/linux` to be [as here](https://gist.github.com/jesstelford/67eceb7a7fa08405f6b7).
- For Debian Jessie, change the `HACKDIR=...` line to be `HACKDIR=$(PREFIX)/lib/games/$(GAME)dir`
- If you want to enable [Status Hilite's](http://www.nethack.org/v360/Guidebook.html#_TOCentry_53);
- Edit `include/config.h`
- Change `/* #define STATUS_VIA_WINDOWPORT */` to `#define STATUS_VIA_WINDOWPORT`
- Change `/* #define STATUS_HILITES */` to `#define STATUS_HILITES`
- `sh ./sys/unix/setup.sh sys/unix/hints/linux` (sets up the Makefiles correctly)

## Build & install

- `make all`
- `sudo checkinstall` (will create a package and install it for you)
- Hit `y` to create default docs
- Enter `nethack 3.6.0` then hit `<Enter>` twice when prompted
- At the options screen, change option _12_ to say `nethack-common`. This avoids accidentally installing any old version from your package manager.
- Hit `<Enter>` to continue
- If you see an error "_Some of the files created by the installation are inside the home directory_";

1. Hit `n` (it's just a temporary file), then
2. Hit `y` to continue (we _do not_ want those files in our package).

### Uninstallation

To uninstall, use your favourite package manager, or `sudo dpkg -r nethack`.

## Play!

Now you can run the game via `nethack`.

Need some help getting starting with nethack? Read the [v3.6.0 guidebook](http://nethack.sourceforge.net/docs/nh360/nethack-360-Guidebook.txt).
