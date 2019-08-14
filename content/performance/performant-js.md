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

### Use requestAnimationFrame for visual changes

```js
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
```

### Use Web Workers when you only have to run JS that does not alter the DOM (such as computations)

Web Workers run off of the main thread.

```js
// var dataToSort = something computationally expensive to sort
var dataSortWorker = new Worker('sort-worker.js');
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
  var sortedData = evt.data; // evt.data is equal to dataToSort
  // Update data on screen...
});
```

- Note: Web workers do not have DOM access but browsers are working on allowing them to.

### Separate code into micro-tasks

```js
var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

/**
 * @param {DOMHighResTimeStamp - Double} taskStartTime
 *  - This is basically the same as if performance.now() was passed when the function was run
 */
function processTaskList(taskStartTime) {
  var taskFinishTime;

  do {
    // Assume the next task is pushed onto a stack.
    var nextTask = taskList.pop();

    // Process nextTask.
    processTask(nextTask);

    // Go again if there's enough time to do the next task.
    taskFinishTime = window.performance.now();
    // Only 3 ms?
  } while (taskFinishTime - taskStartTime < 3);

  if (taskList.length > 0) requestAnimationFrame(processTaskList);
}
```

- This will allow blocks of JS (that affects the DOM) to run one at a time for each frame (there are 60 frames per second) to prevent jank from occurring on the screen.
