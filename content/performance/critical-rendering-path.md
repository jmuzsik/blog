---
title: Critical Rendering Path
template: 'post'
image: "https://developers.google.com/web/progressive-web-apps/images/pwa-lighthouse.png"
alt: "google lighthouse logo"
draft: false
slug: '/posts/critical-rendering-path'
category: 'Performance'
tags:
  - 'Critical Rendering Path'
description: 'The path from code to a real page.'
---

First, let's look at this simple HTML tree:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Critical Path: Measure Script</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="style.css" rel="stylesheet" />
  </head>
  <body onload="measureCRP()">
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg" /></div>
    <script src="timing.js"></script>
  </body>
</html>
```

## What happens when the page is initially loaded

- A network roundtrip (propagation latency) to the server costs around 100ms. This always happens when you first load the webpage.
- Server response time is 100ms for the HTML document and 10ms for all other files.

## Measured time to load on a fast internet connection

1. ? ms's - Run page (network roundtrip)
2. 1ms - Request of document -> Response -> `pagehide` event -> `visibilitychange` event -> `unload` event -> `readystatechange` event which triggers `readystate` to `loading`
   - `pagehide` - sent to a Window when the browser hides the current page in the process of presenting a different page from the session's history.
   - `visibilitychange` - fired when the content of a tab has become visible or has been hidden.
   - `unload` - fired when the document or a child resource is being unloaded.
   - `readystatechange` - changes `readystate` attribute (loading -> interactive -> complete)
3. 11ms - `Received Data` is triggered
4. 20ms - data is parsed, `Finish Loading` is triggered
5. \> 2ms - `Parse HTML` - JS, CSS, image is requested dependent upon where it is in the HTML
6. 35ms - `Receive Response` for CSS
7. 1ms - `Receive Data` -> `Parse Stylesheet` -> `Finish Loading` (stylesheet)
8. Right after - `onload` event is triggered on document
9. 1ms - `Recalculate Style`
10. 85ms - `Layout`
11. \> 1ms - `Update Layer Tree` -> `Paint` -> `Composite Layers` -> same things repeat a little
12. ~ 2ms - `Receive Response` 2x (image and JS) -> `Recieve Data` (Image) -> `Finish Loading` (Image)
13. 3.71ms -> `Composite Layers` (make space for image)
14. \> 1ms -> `Receive Data` (JS) -> `load` (JS) -> call stack(`Evaluate Script` -> `Compile Script`)
15. 5ms - callstack {`Parse HTML`, {`Event Load` -> `Function Call` -> `anonymous` -> `measureCRP`}, {`Recalculate Style` and `Layout}}
16. `DOMContentLoaded`
17. 20 ms later - Layer updating and paint for 1ms

Around 200ms total for that simple site

- The image begins loading first because it is read by the parser before the JS.

## Render Tree

This is the first step in DOM creation. CSS + HTML parsed.

![bytes to characters to tokens to nodes to DOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/full-process.png)

And the CSSOM:

![CSSOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png)

And then when you combine the two:

![combination of the DOM and CSSOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png)

Basically, it goes as so... create DOM tree, apply CSSOM, emit nodes.

### Main premise

This is always the first step in creating a webpage. The browser must know this prior doing anything else related to creating the webpage. So, CSS and HTML are defined as **render blocking resources**.

## Layout and Reflow stage

This occurs after CSS/HTML are parsed. Here, the position/size of each element is calculated to fit into the viewport. After this calculation, paint occurs. The pixels on the screen are created.

## Javascript

You import JS into webpages by script tags.

> ...script (tags) are executed at the exact point where it is inserted in the document. When the HTML parser encounters a script tag, it pauses its process of constructing the DOM and yields control to the JavaScript engine; after the JavaScript engine finishes running, the browser then picks up where it left off and resumes DOM construction.

## Ideal JS/css way to import

`<script async src="timing.js"></script>`

So the page loads more like this:

![Ideal scenario of the critical rendering path for javascript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/analysis-dom-css-js-async.png)

Or with CSS media queries or asynchronous loading of stylesheets:

![Ideal scenario of the critical rendering path when CSS is not necessary for page load](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/analysis-dom-css-nb-js-async.png)

## Optimizing the Critical Rendering Path (how you should format your HTML document)

The general sequence of steps to optimize the critical rendering path is:

1. Analyze and characterize your critical path: number of resources, bytes, length.
2. Minimize number of critical resources: eliminate them, defer their download, mark them as async, and so on.
3. Optimize the number of critical bytes to reduce the download time (number of roundtrips).
4. Optimize the order in which the remaining critical resources are loaded: download all critical assets as early as possible to shorten the critical path length.
