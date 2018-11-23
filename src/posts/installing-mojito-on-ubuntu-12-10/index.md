---
title: 'Installing mojito on Ubuntu 12.10'
date: '2013-02-09T10:56:30.000Z'
tags: []
author: 'jesstelford'
---

Installing [Mojito](http://developer.yahoo.com/cocktails/mojito 'Mojito') should be a simple task using Ubuntu's Package manager... Install the required node and npm dependancies

```
$ sudo apt-get install nodejs nodejs-dev nodejs-legacy npm
```

Update npm:

```
$ sudo npm install -g npm
```

Clear npm cache:

```
$ sudo npm clear cache
```

Install Mojito:

```
$ sudo npm install mojito -g
```

If you get an error similar to:

```
npm ERR! error installing js-yaml@1.0.2
npm ERR! error installing mojito@0.5.3-1

npm ERR! Error: ENOENT, chmod '/usr/local/lib/node\_modules/mojito/node\_modules/js-yaml/bin/js-yaml.js'
...
```

Remove the yaml directory:

```
$ rm -rf ~/.npm/js-yaml
```

And clear the cache:

```
$ sudo npm clear cache
```

Then re-attempt the installation:

```
$ sudo npm install mojito -g
```

Now, Enjoy those tasty [Mojitos](http://developer.yahoo.com/cocktails/mojito 'Mojito')!
