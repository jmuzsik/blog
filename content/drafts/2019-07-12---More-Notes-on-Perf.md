---
title: More Notes on Performance
template: 'draft'
draft: true
slug: '/posts/notes-on-performance-7-12-19/'
category: 'Performance'
tags:
  - 'Learning'
  - 'Javascript'
  - 'CSS'
  - 'Performance'
  - 'DOM'
  - 'sendBeacon()'
  - 'requestAnimationFrame'
  - 'Web worker'
  - 'BEM'
  - 'Astronomy'
description: 'More notes from Google Web Fundamentals articles. This is focused on performance during the critical rendering phase as well as ways to optimise code to run 60 frames per second. A bit astronomy at the end.'
---

## TL;DR

1. Analyse your code constantly with the Performance Dev Tool.
2. Images are not a part of the critical rendering path but the windows `onload` event will not trigger unless images/all else is finished loading.
3. The window has a lot of interesting events. Many trigger in the initial loading of a site. `DOMContentLoaded` is triggered when CSS/HTML/JS-that-is-not-async is finished.
4. **Keep JS async** as much as is possible.
5. Keep CSS minimal. Write separate files for different screen sizes and link these stylesheets with the media attribute. **Use the media attribute**.
6. `navigator.sendBeacon()` may be useful in my future.
7. _60 frames per second_ is the goal. You have 10ms to do everything you need to do per frame to get those _60 frames per second_.
8. **JS -> Style -> Layout -> Paint -> Composite** or JS talks to the DOM -> selectors -> spacing -> filling in pixels -> layering
9. You **can** skip layout by changing something that only affects paint.
10. You can skip layout and paint by only changing attributes related to composite.
11. **Use `requestAnimationFrame`** whenever you mess with the DOM.
12. Whenever you have JS running in the background that does not affect the DOM, use a **Web Worker**.
13. Lots of code that needs to be run? **Micro tasks**. Basically, put the functions that need to be run in a stack, and gradually pop off the stack after each frame. (that's 60 blocks of code a second that can be run, just a bit more work to do)
14. **Use BEM**. Every selector is one specific class.
15. Avoid changing layout properties as often as possible. _Layout is expensive_. Be thoughtful when updating attributes that affect layout. Do not cause the layout to be repeatedly recreated. Do it in one fell swoop if at all.
16. Use `will-change` if an animation has poor performance.
17. **Use transform and opacity over other animation properties.**
18. Mercury is the closest planet to every other planet throughout the year, on average.

### Jank

- Devices refresh their screen 60 times a second, so whatever code is running within a single frame should take (1s (1000ms) / 60) = `16.66ms`. But "housekeeping" occurs as well. So it is closer to `10ms`. If your processes take more than `10ms` the frame rate drops. You don't want that. You want to keep that 60 frames per second.

### Pixel pipeline

![pixel pipeline representation](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

1. JS - explains itself
2. Style Calculations - figuring out which elements to style based on selectors
3. Layout - Calculate spacing of each element on the screen. Calculates element's geometry.
4. Paint - Filling in pixels. It involves drawing out text, colors, images, borders, and shadows, essentially every visual part of the elements. The drawing is typically done onto multiple surfaces, often called layers
5. Compositing - Orders the layers in the page correctly.

#### Sometimes the whole pipeline is not utilised

1. JS / CSS -> Style -> Layout -> Paint -> Composite
   - Browser has to check all the other elements and "reflow" the page.
2. JS / CSS -> Style -> Paint -> Composite
   - If changing "paint only" property, Layout is skipped
3. JS / CSS -> Style -> Composite
   - No affect on paint or layout. Only compositing.

## Optimise Javascript Execution

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

### Reduce complexity or use Web Workers

#### Web Workers

Web Workers run off of the main thread.

```js
var dataSortWorker = new Worker('sort-worker.js');
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
  var sortedData = evt.data;
  // Update data on screen...
});
```

- Note: Web workers do not have DOM access.

#### Separating your code into Micro tasks

```js
var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

function processTaskList(taskStartTime) {
  var taskFinishTime;

  do {
    // Assume the next task is pushed onto a stack.
    var nextTask = taskList.pop();

    // Process nextTask.
    processTask(nextTask);

    // Go again if there’s enough time to do the next task.
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);

  if (taskList.length > 0) requestAnimationFrame(processTaskList);
}
```

- So, blocks of JS run one at a time, for each frame.

### Know your JavaScript’s “frame tax”

Dev tools Performance Tab -> Main where you can see which JS functions are taking a long time.

### Avoid micro-optimizing your JavaScript

The other thing's specified are much more vital and likely to be the problem.

## Reduce the Scope and Complexity of Style Calculations

### Reduce the complexity of your selectors

Basically, don't do this:

```css
.box:nth-last-child(-n + 1) .title {
  /* styles */
}
```

Do something like this:

```css
.box-title {
  /* styles */
}
```

### Reduce the number of elements being styled

This is vague. It states:

> Where you can you should reduce the number of invalidated elements.

- Which I _believe_ means that we should reduce the numer of _invalidated css_ by, well, limiting the amount of CSS that is overwritten.

### Measure your Style Recalculation Cost

- Dev tools timeline

### Use Block, Element, Modifier (BEM)

- **Everything has a single class**

```css
.list {
}
.list__list-item {
}
.list__list-item--last-child {
}
```

## Avoid Large, Complex Layouts and Layout Thrashing

### Avoid layout wherever possible

Any change to geometric properties (width, height, left, top, etc.) requires layout.

Layout is generally scoped to the entire document.

- If you click Layout in the performance tab it will tell you how long it took, how many nodes needed layout, among other things.

### Use flexbox over older layout models

Ok. But again he is very adamant:

> **try and avoid triggering layout altogether**

### Avoid forced synchronous layouts

```js
function logBoxHeight() {
  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
```

- Basically, the height will be added when the class is. Logging it out right after will force the layout so that the correct height can be read. This can make the operation much more expensive.

### Avoid layout thrashing

```js
function resizeAllParagraphsToMatchBlockWidth() {
  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
```

- Here, say the paragraphs are in the box, during each iteration this happens:
  1. The box's width changes.
  2. Styles are updated.
  3. Layout is updated.
  4. Oh wait, box width changed, repeat process...

```js
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
```

Read then write is the correct way. The layout will only run once for the box.

- [Potentially useful library in relation](https://github.com/wilsonpage/fastdom)

## Simplify Paint Complexity and Reduce Paint Areas

### Triggering Layout And Paint

If layout is triggered, paint will as well.

### Use Chrome DevTools to quickly identify paint bottlenecks

Performance -> command + shift + p -> paint flashing

- Screen will flash whenever painting happens.

### Promote elements that move or fade

#### [the `will-change` property](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

Hints to browsers how an element is expected to change. Browsers may set up optimizations before an element is actually changed.

> This gives the browser the forewarning that changes are incoming and, depending on what you plan to change, the browser can potentially make provisions, such as creating compositor layers.

```css
.moving-element {
  will-change: transform;
}
```

### Reduce paint areas

> ...for example, if you have a fixed header at the top of the page, and something being painted at the bottom the screen, the entire screen may end up being repainted.

- Interesting, this is something I will have to learn the hard way.

### Simplify paint complexity

Use the `Paint Profiler`

[How to get to it](https://stackoverflow.com/questions/38437722/no-paint-profiler-in-chrome-devtools)

- It will tell you the performance of the styling used.

## Stick to Compositor-Only Properties and Manage Layer Count

### Compositing?

Where the painted parts of the page are put together for displaying on screen.

### Use transform and opacity changes for animations

These are the only two properties that skip both layout and paint.

#### [This may be useful for transitioning to transforms in animations](https://aerotwist.com/blog/flip-your-animations/)

Some code from it:

```js
// Get the first position.
var first = el.getBoundingClientRect();

// Move it to the end.
el.classList.add('totes-at-the-end');

// Get the last position.
var last = el.getBoundingClientRect();

// Invert.
var invert = first.top - last.top;

// Go from the inverted position to last.
var player = el.animate(
  [{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }],
  {
    duration: 300,
    easing: 'cubic-bezier(0,0,0.32,1)'
  }
);

// Do any tidy up at the end
// of the animation.
player.addEventListener('finish', tidyUpAnimations);
```

- Just a physical (bytes?) note. This is something I would need to get my hands dirty with to understand.

## And now for something completely different:

![Closest planet to earth diagram](https://www.extremetech.com/wp-content/uploads/2019/03/media_sizes_full_figure4.gif)

What is being shown above is the fact that throughout the year Mercury is closest to the Earth. To go further than that, Mercury is closer, on average (throughout the year) to every planet on the solar system.

That may be counterintuitive because of these facts:

- 0.39 AU = Mercury's distance from the Sun
- 0.723 AU = Venus's distance from the Sun
- 1 AU (149.6 million km) = Earth's distance from the Sun
- 1.524 AU = Mar's distance from the Sun

Well, the reason can be discerned in the above diagram. Mercury is repeatedly in the same place. Close to the sun. While the planets (Earth included) are often large distances away from each other in their orbital path. So, each planet is closest to Mercury on average throughout the year.
