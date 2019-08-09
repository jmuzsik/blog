---
title: Performant CSS
template: 'post'
draft: false
slug: '/performance/css'
category: 'Performance'
tags:
  - 'Performant CSS'
description: 'Ways to write more responsive CSS.'
---

## At the DOM level

Utilise CSS media queries as often as possible, to prevent additional CSS from being rendered. This is literally saying, if you know that a certain CSS will only be utilised for one screen size, another set of CSS only for another screen size than you should separate these files and import them into the page based upon media queries.

- One way is separate files in HTML (`<link href="stylesheet.css" rel="stylesheet" media="(max-width: ?px)">`)
  - Note: A style sheet with a media query attached to its <link> tag will still download even if the query returns false. Nevertheless, its contents will not apply unless and until the result of the query changes to true.
  - This is especially useful for obscure styles such as print: `<link href="print.css" rel="stylesheet" media="print">`
- This also works with normal css media queries (`@media (max-width: ?px`)). The browser will, prelimarily, check these media queries and filter out any css not fitting the current screen size.

### Put CSS in the document head

Specify all CSS resources as early as possible within the HTML document so that the browser can discover the `<link>` tags and dispatch the request for the CSS as soon as possible.

## Avoid CSS imports

Using `@import` prevents stylesheets from being downloaded concurrently. The file that is being imported will be discovered within the CSS file instead of at an explicit place in your HTML file.

## Inline render-blocking CSS

CSS is already render-blocking. So, if you put all the CSS required for the initial page load where it can be read ASAP, then your page will load faster.
