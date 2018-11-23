---
title: 'Testing using Mocks & Stubs with PHPUnit'
date: '2011-11-11T11:51:49.000Z'
tags: ['coding', 'php', 'phpunit', 'testing', 'unit testing']
author: 'jesstelford'
---

Now that we've got [PHPUnit setup](http://jt0.org/2011/installing-phpunit-ubuntu-linux), we need to start writing the unit tests. My immediate needs are to Unit test two classes, the first being a basic structure with getters and setters with small calculations performed. The [PHPUnit manual](http://www.phpunit.de/manual/current/en/) provides a great starting point for testing this class in chapters [4](http://www.phpunit.de/manual/current/en/writing-tests-for-phpunit.html) and [6](http://www.phpunit.de/manual/current/en/fixtures.html), so I wont cover those here. The second class, however, maintains a list of objects of the first type as well as performing some calculations based on them. Since we're doing unit tests and not integration tests, we need to make sure that the results of our second class are predictable which means decoupling it from the first class. This obviously presents a problem whereby it would no longer function without the first class. This is where Mocks and Stubs come in.

## Mocks & Stubs

In short, these are dummy classes which provide exactly the same interface as the class they are replacing for the test. Stubs perform no calculations and always return a predictable value (eg; NULL, or a predefined value). Mocks also perform no calculations, but are used to follow the execution path of the calling code. That is, to ensure that a particular function from the Mock is called, it must somehow verify that it has been called with the expected parameters. [Chapter 11](http://www.phpunit.de/manual/current/en/test-doubles.html) of the PHPUnit manual explains this in more detail. Unfortunately, that chapter goes into a bit too much detail and quickly becomes overwhelming, so here is my take on how to perform these tests;

## Mocks & Stubs with PHPUnit

Both Mocks & Stubs are created by calling the function `$this->getMock` when in a class that extends `PHPUnit_Framework_TestCase`. The difference between a Mock and a Stub only becomes apparent when you as the tester give this new class its functionality. That is, setting a consistent return value for a stub, or telling PHPUnit what to expect when called and how many times it should be called, etc.

### Stubs

```
// Create a stub for the SomeClass class.
$stub = $this->getMock('SomeClass');
```

// Configure the stub. $stub->expects($this->any()) ->method('doSomething') ->will(\$this->returnValue('foo')); The above creates a stub for the `SomeClass` class. It then goes on to say that the method `doSomething()` of `SomeClass` can be called any number of times, and it will always return 'foo'. As explained in [Chapter 11](http://www.phpunit.de/manual/current/en/test-doubles.html), there are other things that can be set here, but for the basic Stub, this is what you'll be after.

### Mocks

```
// Create a mock for the SomeClass class,
// only mock the update() method.
$mock = $this->getMock('SomeClass', array('update'));
```

// Set up the expectation for the update() method // to be called only once and with the string 'something' // as its parameter. $mock->expects($this->once()) ->method('update') ->with(\$this->equalTo('something')); The above is very similar to the Stub example, with a couple of key differences. First, the only method in `SomeClass` that is overwritten is `update()` \- every other method of the class is left as-is. Next, the `update()` is expected to be called only once and with the single parameter of 'something'. The final step (not shown above) is to then call the method that is wished to be tested that will call the Mock object's `update()` method. If these conditions (for both Stubs and Mocks) are not met when the test is finished, then the test will fail. This makes sense as we're trying to set up the test to perform a specific action that has a known desired execution path with known expected results.

## What's next

Go and (re)read [Chapter 11](http://www.phpunit.de/manual/current/en/test-doubles.html) of the PHPUnit manual - keeping in mind the simplified explanations I have put forward here.
