---
title: Notes on Performance
date: '2019-07-11'
template: 'post'
draft: false
slug: '/posts/notes-on-performance-7-11-19/'
category: 'Performance'
tags:
  - 'Learning'
  - 'Javascript'
  - 'Performance'
  - 'RAIL'
  - 'Dev Tools'
  - 'CSSOM'
  - 'DOM'
description: 'Focus is on performance. Notes are from Google Web Fundamentals articles. RAIL Model, DOM, CSSOM, Navigation Timing API,'
---

## TL;DR

1. RAIL - Response, Animation, Idle, Load
2. Utilise the Performance tab in Dev Tools regularly
3. CSSOM must be created first (b/c JS race condition), DOM tree and JS then (JS runs where it is located in the tree, only what is before it is accessible),
4. Render tree -> Layout on page -> Paint nodes to screen
5. Asynchronously load JS
6. Write CSS for specific screen sizes and only load that CSS for said screen size
7. Use the `Navigation Timing API`

## RAIL Model

Reading article by Google about this. This is a great example of why page speed is so damn important.


### User Perception Of Performance Delays

## | 0 to 16ms

- Users are exceptionally good at tracking motion, and they dislike it when animations aren't smooth. They perceive animations as smooth so long as 60 new frames are rendered every second. That's 16ms per frame, including the time it takes for the browser to paint the new frame to the screen, leaving an app about 10ms to produce a frame.

## | 0 to 100ms

- Respond to user actions within this time window and users feel like the result is immediate. Any longer, and the connection between action and reaction is broken.

## | 100 to 300ms

Users experience a slight perceptible delay.

## | 300 to 1000ms

- Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages or changing views represents a task.

## | 1000ms or more

- Beyond 1000 milliseconds (1 second), users lose focus on the task they are performing.

## | 10000ms or more

- Beyond 10000 milliseconds (10 seconds), users are frustrated and are likely to abandon tasks. They may or may not come back later.

### What is the R in RAIL?

**Response: process events in under 50ms**

Basically, any time a user interacts with anything on your page, they should not have to wait more then 50 seconds to see a **response**.

### What is A?

**Animation: produce a frame in 10ms**

> ... the key is to do nothing where you can, and the absolute minimum where you can't

- From what I can tell, it's stating that you need to make sure there are no background tasks that can effect the flow of repainting running while the animation is running. When an animation occurs, it should be able to do it's thing quickly, and move on.

### What is I?

**Idle: maximize idle time**

- Basically, in the background, at all times, each chunk of data being parsed into the webpage should take less than 50ms to run. And, if a user interacts with the webpage, this background work ought to be set aside, and restarted after the user does their thing.

### What is L?

**Load: deliver content and become interactive in under 5 seconds**

Speaks for itself.

### Tools for measuring RAIL

#### Analyze frames per second

- First, you open the performance tab in chrome dev tools, then lower the CPU ~ around 4x slower. Record. Look for places where the FPS < 60. Optimise around that.

- Or a much simpler way:
  - `Command+Shift+P` -> `Show Rendering` -> enable `FPS Meter`

#### Finding the bottleneck

1. The **initial summary** is where work was allocated. You want to avoid a lot of time being spent on rendering.
2. The **main** section
   - Wider the bar, longer it took.
   - Y-axis is the call stack, what is on top caused what is below it.
   - Red triangles mean that there is an issue with the event.
   - Clicking a bar in this section will direct you to the source code that triggered it.
     - Here, there are parts on the left that highlight what is the cause of the performance issue. Yellow highlight with milliseconds specified.

## Critical Rendering Path

### Render tree

Nice way to express the DOM:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="style.css" rel="stylesheet" />
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg" /></div>
  </body>
</html>
```

->

![bytes to characters to tokens to nodes to DOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png)

And the CSSOM:

![CSSOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png)

And then when you combine the two:

![combination of the DOM and CSSOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png)

Basically, it goes as so... create DOM tree, apply CSSOM, emit nodes.

### Layout or Reflow Stage

After the render tree is set up, this stage is run.

Here, the position/size of each element is calculated to fit into the viewport.

After this calculation, paint occurs. The pixels on the screen are created.

And a note, as for something that effects performance:

> If either the DOM or CSSOM were modified, you would have to repeat the process in order to figure out which pixels would need to be re-rendered on the screen.

### Render Blocking CSS

> By default, CSS is treated as a render blocking resource, which means that the browser won't render any processed content until the CSSOM is constructed

- Beyond this: **both HTML and CSS are render blocking resources.**

#### Utilise CSS media queries as often as possible, to prevent additional CSS from being rendered

This can be done with either media queries in CSS files or with the media attribute in link tags.

### Adding Interactivity with JavaScript

> ...script (tags) are executed at the exact point where it is inserted in the document. When the HTML parser encounters a script tag, it pauses its process of constructing the DOM and yields control to the JavaScript engine; after the JavaScript engine finishes running, the browser then picks up where it left off and resumes DOM construction.

Also,

> ...executing inline script('s) blocks DOM construction, which also delays the initial render.

And then, this is also a fact because it goes like this... Create DOM (oh wait... scripts can be in the DOM and then run, and wait... the CSSOM hasn't been created yet (or has it) -> race condition) -> Create CSSOM...

- So it's really like this: create CSSOM -> create DOM/run JS

> ...the browser delays script execution and DOM construction until it has finished downloading and constructing the CSSOM.

And then there is this thing about external JS files: ie. `<script src="app.js"></script>`

> ...in the case of an external JavaScript file the browser must pause to wait for the script to be fetched from disk, cache, or a remote server, which can add tens to thousands of milliseconds of delay to the critical rendering path.

And what is being said there is all JS is parser blocking.

In which case you should do this if possible: `<script src="app.js" async></script>`

Or in other words, "DOM, don't wait for the script, just do your thing".

### Measuring the Critical Rendering Path

#### Using the Navigation Timing API

First, some time stamps that the browser keeps track of when loading your page:

![navigation timing api timestamps](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/dom-navtiming.png)

It goes like this:

1. `domLoading` - start parsing the first received bytes of the HTML document
2. `domInteractive` - point when the browser has finished parsing all of the HTML and DOM construction is complete

- DOM is ready

3. `domContentLoaded` - point when DOM is ready and there are no stylesheets blocking JS execution

- DOM and CSSDOM are ready

4. `domComplete` - all of the processing is complete and all of the resources on the page (images, etc.) have finished downloading
5. `loadEvent` - a final step in every page load the browser fires an onload event which can trigger additional application logic.

```html
    <script>
      function measureCRP() {
        const t = window.performance.timing;
        const interactive = t.domInteractive - t.domLoading;
        const dcl = t.domContentLoadedEventStart - t.domLoading;
        const complete = t.domComplete - t.domLoading;
        let stats = document.createElement('p');
        stats.textContent = 'interactive: ' + interactive + 'ms, ' +
            'dcl: ' + dcl + 'ms, complete: ' + complete + 'ms';
        document.body.appendChild(stats);
      }
    </script>
  </head>
  <body onload="measureCRP()">
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
```

Above captures when the API's events are triggered.
