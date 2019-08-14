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

### Avoid layout wherever possible

Any change to geometric properties (width, height, left, top, etc.) requires layout.

Layout is generally scoped to the entire document.

- If you click Layout in the performance tab it will tell you how long it took, how many nodes needed layout, among other things.

### Avoid forced synchronous layouts

This ones a little more odd.

```js
function logBoxHeight() {
  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
```

- Here, when the class is added the styles are not immediately calculated. But, when you check the `offsetHeight` as specified above you are **forcing** the styles to be calculated, rather than the style changes being batched and then set after all the required javascript is run.

### Avoid layout thrashing

An example of making each paragraph in a box the width of the box.

```js
function resizeAllParagraphsToMatchBlockWidth() {
  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
```

- The browser likes to update CSS in batches. Here _forced synchronous layouts_ occurs repeatedly, as:
  - The paragraphs width is changed to the boxes width (when the boxes width could have been altered by the change in paragraph width) causing the layout to be updated during each iteration.

So this is what should be done in this case

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

### [the `will-change` property](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

Hints to browsers how an element is expected to change. Browsers may set up optimizations before an element is actually changed.

> This gives the browser the forewarning that changes are incoming and, depending on what you plan to change, the browser can potentially make provisions, such as creating compositor layers.

```css
.moving-element {
  will-change: transform;
}
```

- This should be used only for very specific performance bottlenecks.

### Use transform and opacity changes for animations

These are the only two properties that skip both layout and paint. These properties skip straight to compositing (Where the painted parts of the page are put together for displaying on screen).


