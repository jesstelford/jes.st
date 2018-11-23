---
title: 'The Visitor Pattern in PHP'
date: '2012-12-04T10:37:34.000Z'
tags:
  ['algorithm', 'code', 'coding', 'design patterns', 'php', 'visitor pattern']
author: 'jesstelford'
---

Implementing the [Visitor Pattern](http://en.wikipedia.org/wiki/Visitor_pattern 'Visitor Pattern') requires the ability to dynamically determine the type of the Visitor and the type of the "Element" (aka: object receiving the visitor). In PHP (>= 5.0.0), this can easily be achieved with the `get_class()` function as we will see shortly. Let's start by looking at how the Visitor Pattern will look within user code;

```php
$updateVisitor = new UpdateVisitor();
$deleteVisitor = new DeleteVisitor();
$element = new Foo();

$element->visit($updateVisitor);
$element->visit($deleteVisitor);
```

Looking at the `UpdateVisitor` class, we want the `visitFoo()` function to be called;

```php
interface Visitor { }
class UpdateVisitor implements Visitor {
    public function visitFoo(Foo $theElement) {
        // ...
    }
}
```

You may already be (correctly) thinking "Why not just call `$updateVisitor->visitFoo($element)` directly?". What about when we also have an Element class `Baz`? We'd then need to call `$updateVisitor->visitBaz($element)`. And so on for each Element type. Wouldn't it be so much easier if we just let the Double Dipatch (aka: The Visitor Pattern) handle which function to call so we could keep our code super clean, like this:

```php
$foo = new Foo();

$foo->visit(new UpdateVisitor());
$foo->visit(new DeleteVisitor());

$bar = new Bar();

$bar->visit(new UpdateVisitor());
$bar->visit(new DeleteVisitor());
```

The only things we need to know about are that the Element's class has a function `visit()` and the class which contains the algorithm we want executed. We'll make an abstract base class for our Visitors to inherit from, effectively hiding the guts allowing us to concentrate on the algorithm's implementation:

```php
abstract class Element {
    public function accept(Visitor $visitor) {
        // ... Call visitFoo, etc, here
    }
}
```

The part that we're really interested here is calling visitFoo, etc. This is where Double Dispatch rears its beautiful head. We've already invoked Single Dispatch when we sent an object of a known type (`Visitor`) into the function `accept()`. What we want to do now is call a particular method on the `$this` object based on the type of `Visitor` that was passed in:

```php
abstract class Element
{
    public function accept(Visitor $visitor)
    {
        // ... Call visitFoo, etc, here
        $visitMethods = get\_class\_methods($visitor);
        $elementClass = get_class($this);

        foreach ($visitMethods as $method) {

            // we've found the visitation method for this class type
            if ('visit' . $elementClass == $method) {

                // visit the method and exit
                $visitor->{'visit' . $elementClass}($this);
                return;
            }
        }
    }
}
```

The magic Double Dispatch happens when we invoke the method on line 15. For example;

```php
$updateVisitor = new UpdateVisitor();
$element = new Foo();
$element->visit($updateVisitor);
```

This will search on the object `$updateVisitor` for a method `visitFoo()` which accepts a type of `Visitor`. The astute reader will have noticed that if there were no methods matching, this Double Dispatch will never occur, so we need to provide a way to handle these situations.

```php
abstract class Element
{
    public function accept(Visitor $visitor)
    {
        // \[...\]

        // If no visitFoo, etc, call a default algorithm
        $visitor->defaultVisit($this);
    }
}

interface Visitor
{
    public function defaultVisit(Element $element);
}

class UpdateVisitor implements Visitor
{
    public function defaultVisit(Element $element)
    {
        $elementClass = get_class($element);
        $thisClass = get_class($this);
        throw new Exception("Visitor method " . $thisClass . "::visit" . $elementClass . "(" . $elementClass . ") is not implemented!");
    }
}
```

When the method `visitFoo()` isn't found on the `Visitor` object, it will fall through to the object's `defaultVisit()` method. In this case, throwing an exception. Our final code will look this:

```php
abstract class Element
{
    public function accept(Visitor $visitor)
    {
        // ... Call visitFoo, etc, here
        $visitMethods = get\_class\_methods($visitor);
        $elementClass = get_class($this);

        foreach ($visitMethods as $method) {

            // we've found the visitation method for this class type
            if ('visit' . $elementClass == $method) {

                // visit the method and exit
                $visitor->{'visit' . $elementClass}($this);
                return;
            }
        }

        // If no visitFoo, etc, call a default algorithm
        $visitor->defaultVisit($this);
    }
}

class Foo extends Element
{
    // ... some functionality specific to Foo
}

interface Visitor
{
    public function defaultVisit(Element $element);
}

class UpdateVisitor implements Visitor
{
    public function visitFoo(Foo $theElement)
    {
        // ... 'update' $theElement of type Foo
    }

    public function defaultVisit(Element $element)
    {
        $elementClass = get_class($element);
        $thisClass = get_class($this);
        throw new Exception("Visitor method " . $thisClass . "::visit" . $elementClass . "(" . $elementClass . ") is not implemented!");
    }
}

$updateVisitor = new UpdateVisitor();
$element = new Foo();
$element->visit($updateVisitor);
```

As we saw at the start, you can then create a `DeleteVisitor`, or any other kind of visitor, and as long as it has a `visitFoo()` function, you can operate on that object. There are a number of different scenarios where the Visitor Pattern / Double Dispatch comes in handy;

- Containing code of similar functionality regardless of type. For example: all the 'Update' functionality, or all the 'Delete' functionality
- When you can't guarantee the types. For example, when you have an object returned using the Factory Pattern that you wish to perform an action on. As long as that Factory returns elements that can `accept()` a visitor, then no type checking is necessary
- When you don't want to change the functionality of a base class. For example, to add a `toString()` type functionality to an already concrete class `Foo` (that can `accept()` visitors), you can create a `ToStringVisitor`, which has a `visitFoo(Foo $element)` function that converts and returns the string representation of `$element`, when called like so:

  ```
  $element->accept(new ToStringVisitor());
  ```

This pattern is a difficult one to wrap your head around at first. Which means your colleagues / collaborators might not understand if you go injecting The Visitor Pattern / Double Dispatch throughout your codebase. However, once you have a good handle on the concept, oportunities will begin to present themselves which are perfect for this. Now, go forth and Visit!
