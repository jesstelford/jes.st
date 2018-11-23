---
title: 'PHPUnit Bootstrap and Autoloading classes'
date: '2011-11-29T01:32:45.000Z'
tags:
  [
    'autoload',
    'bootstrap',
    'code',
    'coding',
    'php',
    'phpunit',
    'testing',
    'unit testing',
  ]
author: 'jesstelford'
---

The [PHPUnit Bootstrap](http://www.phpunit.de/manual/current/en/textui.html#textui.clioptions 'The XML Configuration File') is perfect when there is code to be run before tests are executed. The limitation however is there can only be one bootstrap per PHPUnit configuration file. This is an issue if there are a set of classes that need to be included - we don't want to manually include every class every test could possibly need. [PHP's Autoloading feature](http://php.net/manual/en/function.spl-autoload-register.php 'Register given function as __autoload() implementation') comes to the rescue, allowing us to seamlessly include classes as they're required for tests.

### The old way

Normally, you would have to include all the dependencies of classes you wish to test:

```php
include_once('../classes/Foo.php');
include_once('../classes/Bar.php');
include_once('../classes/Baz.php');
// ... ad infinitum

class FooTest extends PHPUnit\_Framework\_TestCase{
    public function testNewFoo() {
        $foo = new Foo();
        // ...
    }
}
```

### The PHPUnit Bootstrap way

Instead, we can let PHPUnit know we want to run a bootstrap file before tests are executed:

Simply save this as `phpunit.xml` in the same directory as where you run your tests.

### The Autoloader

In a file called `AutoLoader.php`, we're going to use PHP's autoloading feature to include classes as they're needed: \[_**Note:** This requires a certain file-name convention of files. The filename should be the same as the class name (with the .php extension)_\]

```php
class AutoLoader {

    static private $classNames = array();

    /\*\*
     \* Store the filename (sans extension) & full path of all ".php" files found
     */
    public static function registerDirectory($dirName) {

        $di = new DirectoryIterator($dirName);
        foreach ($di as $file) {

            if ($file->isDir() && !$file->isLink() && !$file->isDot()) {
                // recurse into directories other than a few special ones
                self::registerDirectory($file->getPathname());
            } elseif (substr($file->getFilename(), -4) === '.php') {
                // save the class name / path of a .php file found
                $className = substr($file->getFilename(), 0, -4);
                AutoLoader::registerClass($className, $file->getPathname());
            }
        }
    }

    public static function registerClass($className, $fileName) {
        AutoLoader::$classNames\[$className\] = $fileName;
    }

    public static function loadClass($className) {
        if (isset(AutoLoader::$classNames\[$className\])) {
            require_once(AutoLoader::$classNames\[$className\]);
        }
     }

}

spl\_autoload\_register(array('AutoLoader', 'loadClass'));
```

### Putting it together

Finally, create the `bootstrap.php` file which will include the autoloader and register your include directory:

```php
include_once('AutoLoader.php');
// Register the directory to your include files
AutoLoader::registerDirectory('../classes');
```

All done! Now, your tests no longer have to include the classes you're after. PHP's autoloading (and the `AutoLoader` class) will take care of it for you:

```php
// No includes needed, hooray!
class FooTest extends PHPUnit\_Framework\_TestCase{
    public function testNewFoo() {
        $foo = new Foo();
        // ...
    }
}
```
