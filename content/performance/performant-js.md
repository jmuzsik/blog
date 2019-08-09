---
title: Performant JS
template: 'post'
draft: false
slug: '/performance/performant-js'
category: 'Performance'
tags:
  - 'Performant Javascript'
description: 'Ways to help browsers more quickly load JS.'
---

## Put script tags at the end of the document, prior to the end of the body tag

> Your HTML will display quicker in older browsers if you keep the scripts at the end of the body right before </body>. So, to preserve the load speed in older browsers, you don't want to put them anywhere else.

## Defer or asynchronously parse JavaScript

[Check out this article](https://flaviocopes.com/javascript-async-defer/)

[This article is awesome as well](https://javascript.info/script-async-defer)

![defer or asynchronously parse javascript](https://i.stack.imgur.com/wfL82.png)

Without these tags JS will automatically be parsed, blocking the critical path.

With `async`, all script tags with this designation will not have an exact execution order, ie.

```html
<!-- something.js is not guaranteed to be parsed prior to somethingElse.js -->
<script async src="something.js"></script>
<script async src="somethingElse.js"></script>
```

> Async is more useful when you really don't care when the script loads and nothing else that is user dependent depends upon that script loading. ...google analytics or the like.

With `defer`, you have an exact execution order. And, all these files will be parsed after the document is ready but before the `DOMContentLoaded` event.

## Avoid long running JavaScript

This speaks for itself.
