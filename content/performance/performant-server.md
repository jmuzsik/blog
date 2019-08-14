---
title: Performant Server
template: 'post'
draft: false
slug: '/performance/performant-server'
category: 'Performance'
tags:
  - 'Performant Server'
description: 'Ways to optimise the server to properly interact with browsers.'
---

### Expires header's

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

### Optimising text content with Gzip

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

### Enable Caching

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

### https://github.com/andydavies/http2-prioritization-issues

http2 allows the server to decide what type of files are prioritised. CSS prior to images. Images above the fold over images that are below the fold.

This elucidates the fact that even large companies managing major CDN's do not use the stream of data the browsers give them ideally. That is, they do not prioritise the sending of images, as those that are above the fold should be displayed prior to those that are not. But some CDN's do prioritise.

- https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

- https://speedcurve.com/

UX speed instead of performance
