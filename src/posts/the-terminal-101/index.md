---
title: 'The Terminal 101'
date: '2012-01-11T06:18:23.000Z'
tags: ['linux', 'terminal']
author: 'jesstelford'
---

## What is the Terminal?

The Terminal is simply a way to execute commands and to view the files on your computer. It is very similar to the Graphical User Interface that allows you to click around and shows you icons of files. The Terminal, however, is a text only environment. The text only environment is a common source of frustration as it can often times be hard to see why a command didn't work (eg; a typo), or know exactly which directory you're in, or any number of other new concepts for first time users of the Terminal.

## Using the Terminal

When using the Terminal you are writing a series of commands. Each command is executed by pressing Enter. To write a command, you must begin with an empty prompt. This is often denoted by a "$" or a "#" (we will use a "$" from here on) followed by a space when examples are written. In other words, when writing a command in a Terminal, you start at the first non-space character after the prompt (after the "\$"). Except in a few cases, the mouse cannot be used within a Terminal. To move the cursor, you must use the arrow keys. This also means your ability to select text or copy + paste is almost non-existent. All text written in a Terminal is case sensitive. Because of this, almost all commands are written in lower case. This helps to resolve ambiguities such as if a character is an "I" or an "l" (an upper case "i" or a lower case "L"). It can also be source of confusion where the exact same command will not work if the capitalization is incorrect.

## The Working Directory and Paths

At all times when using the Terminal, you have what is called the "_Working Directory_". This means the current directory you are in (very similar to when you're looking for your files in the My Documents directory, or in your Music folder, etc). There are a number of commands which rely on you being in the correct Working Directory for them to have the desired effects. The Working Directory can be thought of as the current Folder you are browsing. Similarly, the location of that Folder is known as the Path. When dealing with Paths, there are two kinds: Relative and Absolute. Absolute Paths rely on a concept known as the root directory.

## The Root Directory

The Root Directory is the furthest up the hierarchy of folders on your computer that you can get. On Windows machines, this is often known as "C:\\". On Linux and Mac OSX, it is known as "/".

## Absolute Paths

Absolute Paths are a way of locating a file or directory on a computer relative to the Root Directory. As an example, a Music directory may have the following locations (depending on your operating system); Windows:

```
C:\\Documents and Settings\\Users\\John Smith\\Music
```

Linux and Mac OSX:

```
/home/johnsmith/Music
```

_An important distinction should be noted here: Windows is the only operating system which uses backslashes "\\" to separate directories. Linux, Mac OSX, and every other operating system ever created uses forwardslashes "/"._

In the first (Windows) example, you can see that the Music directory's location can be thought of as The Root Directory ("C:\\") > "Documents and Settings" > "Users" > "John Smith" > "Music". Similarly, in the second (Linux and Mac OSX) example, you can see the location is The Root Directory "/" > "home" > "johnsmith" > "Music". These are both absolute paths. It can be a pain to constantly write out the full absolute location of a directory or file every time, so there is an alternative...

_Note: From here on, we will only consider Linux and Mac OSX style paths (ie; using the "/" directory separator, and a root of "/")._

## Relative Paths

Continuing with our Music folder example, let's say that the absolute path of your current Working Directory was:

```
/home/johnsmith
```

If we wanted to refer to the Music directory Relative to our current Working Directory, we use the magic directory "." (dot):

```
./Music
```

The path of the Music directory is then taken to be: "current Working Directory" > "Music", which can be further broken down as The Root Directory "/" > "home" > "johnsmith" > "Music" - exactly the same as for the example in the Absolute Paths section, but without having to type out the entire location. This is extremely useful if you wish to refer to locations which are further down in the hierarchy (ie; sub-directories) from the current Working Directory. But, what if you wish to refer to locations which are further *up* the hierarchy (ie; parent directories)? That's where the magic directory ".." (dot dot) comes into play. This refers the the Parent Directory of the current Working Directory. For example, if we still have our current Working Directory as:

```
/home/johnsmith
```

And we want to refer to the "/home" directory, then we would do so by writing:

```
../
```

This can be taken to be: "Parent Directory of the current Working Directory", which can be broken down to "Parent Directory of /home/johnsmith", which finally means simply "/home" - exactly where we meant. This is all fine and well, but what use is a Relative Path if we can't move between directories? Well...

## Changing Directories

What easier way to move between directories than with the "Change Directory" command, simply written as "_cd_". Continuing from our above example, let's say your current Working Directory is:

```
/home/johnsmith
```

And you wish to change the current Working Directory into the "Music" folder. Easy! First, determine either the relative or absolute path of the directory you wish to change into. The absolute path is:

```
/home/johnsmith/Music
```

and the relative path to the current Working Directory is:

```
./Music
```

Now, we need to pass that path to the Change Directory command. This is done by typing the name of the command "_cd_" followed by a space " " then the path. Written using an Absolute Path, the command is:

```
$ cd /home/johnsmith/Music
```

Alternatively, given the current Working Directory, the command can be simplified to:

```
$ cd ./Music
```

_Tip: This can be simplified even further! You can omit the magic "current Working Directory" dot and the directory separator to end up with simply:_

```
_$ cd Music_
```

To then move back to the Parent Directory, you can use the dot dot magic directory path:

```
$ cd ../
```

But, hang on, I hear you asking, how do we know what our current Working Directory actually is? Ah, good question...

## Print Working Directory

There is a command that tells you the current Working Directory. It does this by printing it out onto the Terminal. It is the Print Working Directory command, simply written as "_pwd_". At any time if you forget where your current Working Directory is, simply execute the command:

```
$ pwd
```

And you will be presented with the Absolute Path, such as:

```
/home/johnsmith
```

Ok, so we can move around and find out where we are, but how do we know where we're move *to*?

## List (Directories and Files)

There is a command for that too! This command does as the name suggests; it Lists the Directories and Files in the current Working Directory. The command is simply written as "_ls_" (lower-case "L" - short for "list"). When the List command is executed, it will just print out all the Directories and Files in the current Working Directory. For example, if our current working directory is the Music folder, executing the command:

```
$ ls
```

Could produce output similar to:

```
01 - In The Morning.mp3       06 - Ride The Wave Boy.mp3   11 - The Ending Is Just The Beginning Repeating.mp3
02 - Heatwave.mp3             07 - Resist.mp3              **Album Art**
03 - Machine Gun.mp3          08 - Away From The City.mp3  **Lyrics**
04 - For Another Day.mp3      09 - United.mp3
05 - Song For The Lonely.mp3  10 - Universe.mp3
```

As you can see, directories ("Album Art" and "Lyrics") are often colour coded or written in bold to distinguish them from Files. If they are not, you can always try changing the current Working Directory (_cd_), and if you receive an error such as:

```
cd: foofighters-pretender.mp3: Not a directory
```

Then you know it isn't a directory.

## Summary

So, now you know the basics of using a Terminal; the Working Directory, executing commands, and moving around between Directories:

- Print current Working Directory: *pwd*
- Change Directory: *cd*
- List (Directories and Files): *ls*

Go forth and conquer!
