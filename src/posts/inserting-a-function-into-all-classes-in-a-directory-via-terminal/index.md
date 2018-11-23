---
title: 'Inserting a function into all classes in a directory via Terminal'
date: '2012-04-18T01:30:43.000Z'
tags:
  [
    'ack',
    'code',
    'coding',
    'linux',
    'perl',
    'php',
    'regex',
    'search and replace',
    'terminal',
    'the web',
  ]
author: 'jesstelford'
---

# Or; Multi-line Search and Replace regular expression on the Command Line.

## The situation

You have a single abstract class which is extended multiple times in 10 or 100 different classes throughout your codebase. You've found a need for a new abstract method which all classes must now implement.

## The problem

Who wants to manually insert that new code into all those classes!? (I don't). We need an automated way to do this

## The solution

```bash
ack -l "extends MyClass" | xargs perl -i -pe 'BEGIN{undef $/;} s/(extends MyClass\[^{\]*{)/\\1\\r\\n\\r\\n\\tpublic function newMethod() {}\\r\\n\\r\\n/smg'
```

## How it works

Breaking this up into its parts goes like so:

```bash
ack -l "extends MyClass"
```

Find all files which include the string "extends MyClass" and list them.

```bash
xargs perl -i -pe '\[...\]'
```

Do an in-place perl regular expression search and replace on each file found from above.

```
BEGIN{undef $/;}
```

Tell Perl to no longer consider end-of-line's - this allows us to do a multi-line search and replace.

```
s/\[SEARCH\]/\[REPLACE\]/smg
```

Look for all occurrences of \[SEARCH\] in the file and replace it with \[REPLACE\].

### \[SEARCH\]

```
(extends MyClass\[^{\]*{)
```

Match all occurrences of the string "extends MyClass" followed by any characters up until the opening brace ("{") (remember this also includes new lines!), so it will successfully match all of the following:

```php
extends MyClass{

extends MyClass {

extends MyClass
{

extends MyClass
/\* Comment about class */
{
```

### \[REPLACE\]

```
\\1\\r\\n\\r\\n\\tpublic function newMethod() {}\\r\\n\\r\\n
```

"\\1" will leave what was matched (in the braces "(" and ")" in the result). "\\r\\n\\r\\n" inserts two new lines. "\\t" inserts a tab. "public function newMethod() {}" inserts the new method. "\\r\\n\\r\\n" inserts a further two lines
