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

### `performance.getEntriesByType('resource' || 'navigation')`

The following section is focused on the data returned from this function call

```js
// Get Navigation Timing entries:
performance.getEntriesByType('navigation'); // HTML documents, etc.

// Get Resource Timing entries:
performance.getEntriesByType('resource'); // document dependent resources
```

Both return arrays containing an object similar to this:

```json
{
  "connectEnd": 152.20000001136214,
  "connectStart": 85.00000007916242,
  "decodedBodySize": 1270,
  "domComplete": 377.90000007953495,
  "domContentLoadedEventEnd": 236.4000000525266,
  "domContentLoadedEventStart": 236.4000000525266,
  "domInteractive": 236.2999999895692,
  "domainLookupEnd": 85.00000007916242,
  "domainLookupStart": 64.4000000320375,
  "duration": 377.90000007953495,
  "encodedBodySize": 606,
  "entryType": "navigation",
  "fetchStart": 61.600000015459955,
  "initiatorType": "navigation",
  "loadEventEnd": 377.90000007953495,
  "loadEventStart": 377.90000007953495,
  "name": "https://example.com/",
  "nextHopProtocol": "h2",
  "redirectCount": 0,
  "redirectEnd": 0,
  "redirectStart": 0,
  "requestStart": 152.50000008381903,
  "responseEnd": 197.80000008177012,
  "responseStart": 170.00000004190952,
  "secureConnectionStart": 105.80000001937151,
  "startTime": 0,
  "transferSize": 789,
  "type": "navigate",
  "unloadEventEnd": 0,
  "unloadEventStart": 0,
  "workerStart": 0
}
```

- This is what Google's performance tab displays, a data visualisation of this data among other data.

#### DNS lookup time

> When a user requests a URL, the Domain Name System (DNS) is queried to translate a domain to an IP address

- `domainLookupStart` marks when a DNS lookup starts.
- `domainLookupEnd` marks when a DNS lookup ends.

```js
// Measuring DNS lookup time
var pageNav = performance.getEntriesByType('navigation')[0];
var dnsTime = pageNav.domainLookupEnd - pageNav.domainLookupStart;
```

- Around 20 ms in the data above.

#### Connection negotiation

> When a connection to a server is made, latency occurs as the client and server sort things out prior to sending resources to the client.

- `connectStart` marks when the client opens a connection to the server.
- `secureConnectionStart` marks when the client begins TLS (a cryptographic protocol that provides end-to-end communications security over networks) negotiation.
- `connectEnd` marks when connection negotiation ends (including TLS time).

```js
// Quantifying total connection time
var pageNav = performance.getEntriesByType('navigation')[0];
var connectionTime = pageNav.connectEnd - pageNav.connectStart;
var tlsTime = 0; // <-- Assume 0 by default

// Did any TLS stuff happen?
if (pageNav.secureConnectionStart > 0) {
  // Awesome! Calculate it!
  tlsTime = pageNav.connectEnd - pageNav.secureConnectionStart;
}
```

- Around 67ms in the data.

#### Requests and responses

Some of the most revealing data is here.

There are two factors here:

- **Extrinsic factors**: Stuff like connection latency and bandwidth. Things (mostly) out of our control as developers.
- **Intrinsic factors**: What we have control over... server and client side architecture, and resouce size.

This data expresses how long each resource took to arrive.

- `fetchStart` - when the browser starts to fetch a resource. This marks when the browser begins to check caches to see if a network request is necessary
- `workerStart` - when a request is being fetched from a service worker within a fetch event handler. This is 0 if a service worker isn't installed for the current page
- `requestStart` when the browser issues the network request
- `responseStart` when the first byte of the response arrives
- `responseEnd` when the last byte of the response arrives

Examples:

```js
// Cache seek plus response time
var pageNav = performance.getEntriesByType('navigation')[0];
var fetchTime = pageNav.responseEnd - pageNav.fetchStart;

// Service worker time plus response time
var workerTime = 0;

if (pageNav.workerStart > 0) {
  workerTime = pageNav.responseEnd - pageNav.workerStart;
}

// Request plus response time (network only)
var totalTime = pageNav.responseEnd - pageNav.requestStart;

// Response time only (download)
var downloadTime = pageNav.responseEnd - pageNav.responseStart;

// Time to First Byte (TTFB)
var ttfb = pageNav.responseStart - pageNav.requestStart;
```

#### Document processing

Basically, how long it takes the browser to process the document.

- `domInteractive`, `domContentLoadedEventStart`, `domContentLoadedEventEnd`, and `domComplete`.
- Only Navigation Timing API

#### Loading

When a document and its resources have completely finished loading.

- `loadEventStart` and `loadEventEnd` or `duration`

#### Document and resource size

The size of the document or resource.

- `transferSize` is the size of the resource, including HTTP headers.
- `encodedBodySize` is the compressed size, excluding HTTP headers.
- `decodedBodySize` is the decompressed size, excluding HTTP headers.

```js
// HTTP header size
var pageNav = performance.getEntriesByType('navigation')[0];
var headerSize = pageNav.transferSize - pageNav.encodedBodySize;

// Compression ratio
var compressionRatio = pageNav.decodedBodySize / pageNav.encodedBodySize;
```

- Network panel tells you this stuff already though.
