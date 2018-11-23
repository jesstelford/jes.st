---
title: 'Play Framework, Google App Engine, Java, and HTML5 Boilerplate'
date: '2011-11-11T11:58:20.000Z'
tags: ['app engine', 'coding', 'html5', 'java', 'play', 'the web']
author: 'jesstelford'
---

Getting started with a new project shouldn't be hard. But, **it is**. We have so many different packages to consider and integrate into our development process that it can take quite some time to get setup before we can even start developing. Here's one combination of packages I find particularly useful, and will cover setting up here;

- [Play! Framework](http://www.playframework.org) v1.1 (aka: Play)
- [Google App Engine](http://appengine.google.com) (aka: GAE)
- [HTML5 Boilerplace](http://html5boilerplate.com/) v1.0 (aka: H5BP)

_Note:_ H5BP also includes Modernizr, which in turn includes html5shiv... Just incase you were wondering. I've already covered setting up [Play + GAE](http://jes.st/2011/install-play-framework-module-source) (albeit as an example with an overarching theme for installing a module from source), so I wont cover that again here today. The main focus for this article will be to get HTML5 Boilerplate working with Play + the Play GAE module. There are two ways to get H5BP up and running in Play;

1.  The simple, but incomplete way
2.  The complex, but complete way (An article for another day)

## The simple, but incomplete way

In this way, we will be simply taking the barebones HTML, CSS & JS, and using instead of Play's defaults. What's so incomplete about this way? Well, you miss out on;

- Minifaction of HTML, CSS & JS
- Optimization of JPEGs and PNGs
- Automatic cache busting of resources
- Server-side settings to make your site as fast as can be
- Test / Dev / Prod environment builds

If you can live without these, then read on. If not, you'll have to do it the complex, but complete way (which is an article to write for another day). The meat of this way is simply copying across all the files we need from H5BP:

```
$ cp /path/to/h5bp/*.txt /path/to/play-project/public/
$ cp /path/to/h5bp/crossdomain.xml /path/to/play-project/public/
$ cp /path/to/h5bp/*.ico /path/to/play-project/public/images/
$ cp /path/to/h5bp/*.png /path/to/play-project/public/images/
$ cp /path/to/h5bp/css/* /path/to/play-project/public/stylesheets/
$ cp -r /path/to/h5bp/js/* /path/to/play-project/public/javascripts/
$ cp /path/to/h5bp/index.html /path/to/play-project/app/views/
```

Now that we have all the files, we have to swap out `/path/to/play-project/app/views/main.html` with `/path/to/play-project/app/views/index.html`:

```
$ mv /path/to/play-project/app/views/main.html /path/to/play-project/app/views/main.html.old
$ mv /path/to/play-project/app/views/index.html /path/to/play-project/app/views/main.html
```

Last but not least, we need to bring over all the template parameters from Play into the H5BP html file. Your file should end up looking like this:

```
<!doctype html>
<!\-\- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--\[if lt IE 7 \]> <html class="no-js ie6" lang="en"> <!\[endif\]-->
<!--\[if IE 7 \]> <html class="no-js ie7" lang="en"> <!\[endif\]-->
<!--\[if IE 8 \]> <html class="no-js ie8" lang="en"> <!\[endif\]-->
<!--\[if (gte IE 9)|!(IE)\]><!--> <html class="no-js" lang="en"> <!--<!\[endif\]-->
<head>
<meta charset="utf-8">

<!\-\- Always force latest IE rendering engine (even in intranet) & Chrome Frame
Remove this if you use the .htaccess -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>#{get 'title' /}</title>
<meta name="description" content="">
<meta name="author" content="">

<!\-\- Mobile viewport optimized: j.mp/bplateviewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!\-\- Place favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->

<!\-\- CSS: implied media="all" -->
<link rel="stylesheet" href="@{'/public/stylesheets/style.css'}?v=2">
<link rel="stylesheet" type="text/css" media="screen" href="@{'/public/stylesheets/main.css'}">
#{get 'moreStyles' /}

<!\-\- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
<script src="@{'/public/javascripts/libs/modernizr-1.7.min.js'}"></script>

</head>

<body>

<div id="container">
<header>
</header>
<div id="main" role="main">
#{doLayout /}
</div>
<footer>
</footer>
</div> <!--! end of #container -->

<!\-\- JavaScript at the bottom for fast page loading -->
<!\-\- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>
<script>window.jQuery || document.write("<script src='js/libs/jquery-1.5.1.min.js'>\\x3C/script>")</script>

<!\-\- scripts concatenated and minified via ant build script-->
<script src="js/plugins.js"></script>
<script src="js/script.js"></script>
#{get 'moreScripts' /}
<!\-\- end scripts-->

<!--\[if lt IE 7 \]>
<script src="js/libs/dd_belatedpng.js"></script>
<script>DD\_belatedPNG.fix("img, .png\_bg"); // Fix any <img> or .png_bg bg-images. Also, please read goo.gl/mZiyb </script>
<!\[endif\]-->

<!\-\- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID -->
<script>
var \_gaq=\[\["\_setAccount","UA-XXXXX-X"\],\["_trackPageview"\]\];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)\[0\];g.async=1;
g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
s.parentNode.insertBefore(g,s)}(document,"script"));
</script>

</body>
</html>

Done!

```

## The complex, but complete way

Yet to be written.
