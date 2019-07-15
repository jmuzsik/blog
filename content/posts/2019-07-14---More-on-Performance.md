---
title: More Notes on Performance, The Formation of the Moon
date: '2019-07-14'
template: 'post'
draft: false
slug: '/posts/7-14-19/'
category: 'Performance'
tags:
  - 'Learning'
  - 'Performance'
  - 'Moon'
  - 'Apache'
  - 'Javascript'
  - 'CSS'
description: 'More stuff about performance. Apache stuff. Lab data and field data. Stuff about the formation of the moon.'
---

## TL;DR

1. If, for whatever reason, you have your own server and you need to write code that controls the cache on this server. Then, there is plenty of useful info below.
2. Choose appropriate image types, size them properly, and reduce quality if it is too high.
3. Spriting is basically using the same image (so it is requested only once) for multiple links (such as for social media icons) but it is likely not useful nowadays.
4. Lab data is in controlled environments. Field data is related to real user experience catalogued.
5. There are "tools for increasing revenue" below
6. Use `performance.getEntriesByType('navigation')` and `performance.getEntriesByType('resource')` for field data.
    - Both API's return a bunch of useful metrics to figure out user experience when loading your site.
7. The moon was formed from a synestia. Collision with something powerful -> earth is a cloud of fire -> Earth cools and begins to coalesce eventually leading to the earth -> there are areas outside of the possibility to coalesce that contains matter that was previously the earth which begin to coalesce eventually forming the moon

## Get Started of Loading Performance Section

### Measuring Performance -- Tools

#### Expires header's

Can only be added if you have access to the server.

Looks like this in an `.htaccess` file:

```xml
# ----------------------------------------------------------------------
# Expires headers (for better cache control)
# ----------------------------------------------------------------------

# These are pretty far-future expires headers.
# They assume you control versioning with filename-based cache busting
# Additionally, consider that outdated proxies may miscache
# www.stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring/

# If you don't use filenames to version, lower the CSS and JS to something like
# "access plus 1 week".

<IfModule mod_expires.c>
  ExpiresActive on

# Your document html
  ExpiresByType text/html "access plus 0 seconds"
  ...
</IfModule>
```

- Basically used to control how long each filetype is cached.

#### Summary

Consider these general recommendations.

- **Lighthouse** is primarily for your local iteration as you build your site.
- **WebPageTest** is excellent for testing on real mobile devices and envisioning a more real-world setup.
- **PageSpeed Insights** is great if you aren't sure where to start and want a useful overview of improvement opportunities. PageSpeed Insights recently started including data from the Chrome User Experience Report and might best capture how your real-world users will experience your site.

### Text Content

#### Doing so with Gzip

Again, need access to the server, `.htaccess` file:

```bash
<IfModule deflate_module>
    # Enable compression for the following file types
    AddOutputFilterByType           \
     DEFLATE                        \
      application/javascript        \
      text/css                      \
      text/html                     \
      text/javascript               \
      text/plain                    \
      text/xml
</IfModule>
```

### Graphical Content

#### Choose Appropriate Image Types

> As a rule of thumb, use PNGs for clip art, line drawings, or wherever you need transparency, JPGs for photographs, and GIFs when you need animation.

#### Things to do

1. Size images based on their intended use

> Large images take longer to download than smaller ones. All your images should be appropriately sized for their intended use and should not rely on the browser to resize them for rendering.

2. Crop images to show only what's important

3. Reduce image quality

- `convert name-of-image.ext -quality 0-100 name-of-new-image.ext`

### HTTP Requests

#### Spriting

> Then, instead of using different images for the links, just retrieve the entire image once and use CSS background positioning ("spriting") for each link to display the correct part of the image for the link.

![social media icons related to below html and css](https://developers.google.com/web/fundamentals/performance/get-started/images/image_500.png)

```html
<p><a class="facebook" href="https://facebook.com"></a></p>
<p><a class="twitter" href="https://twitter.com"></a></p>
<p><a class="pinterest" href="https://pinterest.com"></a></p>
<style>
  a.facebook {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-image: url('socialmediaicons.png');
    background-position: 0px 0px;
  }
  a.twitter {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-image: url('socialmediaicons.png');
    background-position: -64px 0px;
  }
  a.pinterest {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-image: url('socialmediaicons.png');
    background-position: -128px 0px;
  }
</style>
```

- So, the image is loaded once. But is rendered three times here, and only the appropriate part of the image is seen for each social media icon.

**Note**: this may be useless on HTTP/2

#### JavaScript Position and Inline Push

Script Location

It is better to put script at the bottom of the body. So page content loads before downloading the script. Only JS needed to load the page should be above the HTML.

Code Location

> Put critical, pre-render scripts directly inside the page itself, referred to as an "inline push".

- ie. in a script tag in the head or the body with the JS code.

### HTTP Caching

**First page load** - browser stores the page resources sent from the network in the HTTP Cache.

**Next page load** - Browser can look in the cache for resources and retrieve them from disk instead of the network.

#### Enabling Caching

**Cache Headers**

Cache-Control - caching based on file type. Notice less time for js/css then for image formats

```xml
<filesMatch ".(ico|jpg|jpeg|png|gif)$">
 Header set Cache-Control "max-age=2592000, public"
</filesMatch>
<filesMatch ".(css|js)$">
 Header set Cache-Control "max-age=86400, public"
</filesMatch>
```

- There are other options that can be specified such as `no-cache`, `no-store`, and `private`

Expires Caching

This was specified above (Expires Header)

## How to Think About Speed Tools

[PDF Version](https://developers.google.com/web/fundamentals/performance/speed-tools/pdf/Infographic-How_To_Think_About_Speed_Tools.pdf)

### Summary

1. No single metric to capture UX
2. Real-world performance is highly variable due to differences in users’ devices, network connections, and other factors
3. Use field data to understand what devices and networks your users are on and appropriately mirror those conditions when you test performance

### Lab vs Field data

#### Lab

Controlled environments with predefined device and network settings

- Use Lighthouse and WebPageTest

#### Field or Real User Monitoring (RUM)

Performance data collected from real page loads your users are experiencing in the wild

- Chrome User Experience Report and PageSpeed Insights

### More tools focused on increasing revenue

[Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/) for mobile site speed based on real-world data from the Chrome UX Report. Used also to check how your site speed compares against your peers in more than ten countries.

[Impact Calculator](https://www.thinkwithgoogle.com/feature/testmysite) for estimating potential revenue opportunity of improving mobile site speed based on Google Analytics data

[TestMySite](https://www.thinkwithgoogle.com/feature/testmysite) for testing your page's mobile loading time alongside industry benchmarks and to learn simple fixes (powered by WebPageTest and PageSpeed Insights)

## Assessing Loading Performance in Real Life with Navigation and Resource Timing

### The problem with Google Lighthouse

It is _synthetic_ (in controlled environments with predefined device and network settings) testing. It does not tell you how your site is performing for real page loads _your users are experiencing in the wild_.

### APIs to help you understand network requests in the browser

#### Navigation Timing

To collect performance metrics for HTML documents

#### Resource Timing

To collect metrics for document-dependent resources.

#### `performance.getEntriesByType`

```js
// Get Navigation Timing entries:
performance.getEntriesByType('navigation');

// Get Resource Timing entries:
performance.getEntriesByType('resource');
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

- This is what Google's performance tab displays, data visualisation of this data.

### The life and timings of a network request

The json object above is from the article this writing is based on.

#### DNS lookup

> When a user requests a URL, the Domain Name System (DNS) is queried to translate a domain to an IP address

- `domainLookupStart` marks when a DNS lookup starts.
- `domainLookupEnd` marks when a DNS lookup ends.

```js
// Measuring DNS lookup time
var pageNav = performance.getEntriesByType('navigation')[0];
var dnsTime = pageNav.domainLookupEnd - pageNav.domainLookupStart;
```

- Around 20 ms in the data.

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

### Requests and responses

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

### The other stuff

All of this stuff is generally inconsequential.

#### Document Unloading

When the browser does some housekeeping prior to loading a new page.

You want to look at:

- `unloadEventStart` and `unloadEventEnd` metrics.
- This is only for the Navigation Timing API

#### Redirects

You check:

- `redirectStart` and `redirectEnd`

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

### Acquiring timings in application code

To be continued...

## Something completely different

![Synestia](https://www.keentween.org/uploads/6/2/4/4/62443641/published/giant-impact-theory_1.png)

[Synestia](https://en.wikipedia.org/wiki/Synestia)

### The prevalent theory as to how the moon was created - A synestia

1. Earth collided with an object of extremely high energy and angular momentum.
2. The entirety of earth's material existence becomes elemental matter (dust-like). It expands its diameter. Surface temperatures are around 3700 °C.
3. Heat is radiated to space. Magma droplets form in the outer layers, raining inward over tens of years. The elemental matter contracts to become more earth-like.
4. Mass remaining outside the Roche limit (is in a way now separate from the earth, so it will then coalesce to form it's own object - the moon in this case) first formed moonlets and then the moon was created.
5. The Earth re-formed later, once the synestia had cooled sufficiently to fall within the co-rotational limit.

> By this model, the Moon's having formed within a cloud of vapor that originated from the Earth is why its isotopic ratios are similar to those of the Earth. The later formation of the Earth (after the synestia cooled) accounts for its having accreted more volatile elements than the Moon.

What is meant by accreting more volatile elements than the moon? ...
