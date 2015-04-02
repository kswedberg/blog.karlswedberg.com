---
date: April 11 2011 20:36:20
title: Reserved words in javascript
categories: js
---

abstract
boolean
byte
char
goto

transient


I have a hard time remembering what JavaScript's reserved words are, mostly because some of them are ridiculous. Seriously: `goto`?

Here is the complete list from the [ECMA-262 Specs][1]:

* abstract (3)
* boolean (3)
* break (3)
* byte (3)
* case
* catch
* char (3)
* class
* const
* continue
* debugger
* default
* delete
* do
* double (3)
* else
* enum
* export
* extends
* false
* final (3)
* finally
* float (3)
* for
* function
* goto (3)
* if
* implements
* import
* in
* instanceof
* int (3)
* interface
* let (5)
* long (3)
* native (3)
* new
* null
* package
* private
* protected
* public
* return
* short (3)
* static
* super
* switch
* synchronized (3)
* this
* throw
* throws (3)
* transient (3)
* true
* try
* typeof
* var
* void
* volatile (3)
* while
* with
* yield (5)

And here are the reserved words, categorized:

### Keywords (7.6.1.1)

* break
* case
* catch
* continue
* debugger
* default
* delete
* do
* else
* finally
* for
* function
* if
* in
* instanceof
* new
* return
* switch
* this
* throw
* try
* typeof
* var
* void
* while
* with

### Null and Boolean literals (7.6.1; described in 7.8.1 and 7.8.2)

* false
* null
* true


### Future Reserved Words (7.6.1.2)

* class
* const
* enum
* export
* extends
* import
* super

### Strict-mode Future Reserved Words (7.6.1.2)

* implements
* interface
* let (5)
* package
* private
* protected
* public
* static
* yield (5)


[1]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
