---
title: Performance Tools
template: 'post'
draft: false
slug: '/posts/performance-js-tools'
category: 'Performance'
tags:
  - 'Tools'
description: 'Tools to measure page performance with JS.'
---

## A variety of tools, mainly tools already existent in the browser

### Navigation Timing API

#### Some background

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
