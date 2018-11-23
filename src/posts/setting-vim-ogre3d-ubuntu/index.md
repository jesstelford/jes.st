---
title: 'Setting up Vim & Ogre3D in Ubuntu'
date: '2011-11-11T11:55:49.000Z'
tags: ['coding', 'games', 'ogre3d', 'ubuntu', 'vim']
author: 'jesstelford'
---

Ogre3D is a great corss-platform game development library. Unfortunately, it is mostly aimed at those using a GUI based IDE. Since I use Vim for all my text input / IDE style needs, I wanted to setup Ogre3D to respect this. Following are the steps for getting everything to play nicely; This tutorial is for a combination of the following software;

- Ubuntu 10.10 Maverick Meerkat (10.04, 10.10, and 11.04 should all work fine)
- Ogre3D 1.7.3
- Vim 7.2 (any version should work fine)

## Install Ogre3D

Fire up the terminal and pop in the following commands to install Ogre3D

```
sudo apt-add-repository ppa:ogre-team/ogre
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install libogre-dev
```

If you also want the samples + documentation;

```
sudo apt-get install ogre-doc
sudo apt-get install ogre-samples-bin
sudo apt-get install ogre-samples-source
```

## Setup an Ogre3D Project

We're going to be following the tutorials for Ogre3D here, so we will use their 'framework' in the following steps. For future projects, you may wish to set things out a little differently, however that is out of the scope of this post.

### Tutorial Framework

Create yourself a directory to house all your Ogre3D coding;

```
mkdir -p ~/Coding/Ogre3D
```

Download the Linux version of the [Tutorial Framework from the Ogre3D Wiki](http://www.ogre3d.org/tikiwiki/Ogre+Wiki+Tutorial+Framework). Feel free to ignore everything else on that page (it just shows a couple alternatives to the "Tutorial Framework" we're using here). Extract the Framework to your coding directory;

```
cd ~/Coding/Ogre3D
tar -xjf /path/to/download/TutorialFramework.tar.bz2
```

Download the distributable data file labeled "_dist (Linux)_" on the [CMake page from the Ogre3D Wiki](http://www.ogre3d.org/tikiwiki/Building+Your+Projects+With+CMake). Again, ignore the rest of this page as we are using Autoconf for our build, not CMake. Extract the distributable data to your coding directory;

```
tar -xjf /path/to/download/dist.tar.bz2
```

Finally, copy the plugins configuration into the distributable data;

```
cp /usr/share/OGRE/plugins.cfg ~/Coding/Ogre3D/dist/bin/plugins.cfg
```

### Setup the build environment

#### Required Files

We need to create 3 files for Autoconf to be able to understand how we want to build everything. **bootstrap** Create this file with the following;

```
#!/bin/sh
rm -rf autom4te.cache
libtoolize --force --copy && aclocal && autoheader && automake --add-missing --force-missing --copy --foreign && autoconf
```

**configure.ac** Create this file with the following;

```
AC_INIT(configure.ac)
AM\_INIT\_AUTOMAKE(SampleApp, 0.1)
AM\_CONFIG\_HEADER(config.h)

AC\_LANG\_CPLUSPLUS
AC\_PROG\_CXX
AM\_PROG\_LIBTOOL

PKG\_CHECK\_MODULES(OGRE, \[OGRE >= 1.2\])
AC\_SUBST(OGRE\_CFLAGS)
AC\_SUBST(OGRE\_LIBS)

PKG\_CHECK\_MODULES(OIS, \[OIS >= 1.0\])
AC\_SUBST(OIS\_CFLAGS)
AC\_SUBST(OIS\_LIBS)

AC\_CONFIG\_FILES(Makefile)
AC_OUTPUT
```

**Makefile.am** Create this file with the following;

```
noinst_HEADERS= BaseApplication.h TutorialApplication.h
```

bin_PROGRAMS= OgreApp OgreApp_CPPFLAGS= -I$(top\_srcdir) OgreApp\_SOURCES= BaseApplication.cpp TutorialApplication.cpp OgreApp\_CXXFLAGS=$(OGRE_CFLAGS) $(OIS\_CFLAGS) OgreApp\_LDADD=$(OGRE_LIBS) \$(OIS_LIBS) EXTRA_DIST = bootstrap AUTOMAKE_OPTIONS = foreign

#### Get Autoconf to do its thing

Finally, run the following commands in the terminal;

```
chmod +x bootstrap
./bootstrap && ./configure
```

Now, your environment is all setup and ready to go. This current setup is very limited to the source files that are included in the Tutorial Framework, as can be seen in Makefile.am lines 1 & 5. Again, changing these to be more flexible / to work with other projects is beyond the scope of this post.

## Build Your Project

Now, it's time to finally build your project! Hurray! In the code directory, execute the following command;

```
make && cp ./OgreApp ./dist/bin/OgreApp
```

This will build the app, and copy it to your build directory ready for execution. To run the app to make sure everything is working as it should;

```
cd dist/bin
./OgreApp
```

## Compiling your Ogre project from within Vim

First, head back to your source directory;

```
cd ~/Coding/Ogre3D
```

Now, open up vim, then issue the following commands, pressing ENTER after each line;

```
:mak
:!cp OgreApp dist/bin/OgreApp
:cd dist/bin
:!./OgreApp
```

Once you exit your app, remember to change your directory back to the source within Vim;

```
:cd ../../
```

Congratulations! You're now using Vim to code and compile your Ogre Project :)
