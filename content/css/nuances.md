---
title: CSS Nuances
template: 'post'
image: 'https://cdn.iconscout.com/icon/free/png-256/css3-9-1175237.png'
alt: 'css logo'
draft: false
slug: '/css/nuances'
category: 'CSS'
tags:
  - 'Nuances'
  - 'CSS'
description: 'Some CSS nuances to update from time to time.'
---

### Descendant vs child selector

```css
/* descendant selector */
ul li {
  margin: 0 0 5px 0;
}
/* child selector */
ul > li {
  margin: 0 0 5px 0;
}
```

### ID's vs Classes

> A good way to remember this is a class is a type of item and the id is the unique name of an item on the page.

#### BEM

One class for everything.

```css
.list {
}
.list__list-item {
}
.list__list-item--last-child {
}
```

### What happens when you alter a CSS property after the DOM has loaded?

https://csstriggers.com

### Reduce complexity of selectors

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

- The second will compile faster.

### Reduce the number of elements being styled

As often as is possible, do not override styles. The less times that the browser has to reset styles for a given element, the quicker it will be able to set up layout/paint/composite.

### font-display

[CSS tricks](https://css-tricks.com/font-display-masses/)

- If you have to use some sort of fancy font.

### CSS containment

> The contain property allows an author to indicate that an element and its contents are, as much as possible, independent of the rest of the document tree.

#### Options

`none | strict | layout | style | paint | size | contain`

- `none` no effect
- `layout` turns on layout containment
- `style` turns on style containment
- `paint` turns on paint containment
- `size` turns on size containment
- `content` all, except size containment
- `strict` layout, style and paint combined

#### Use cases

##### third-party widgets

`contain: strict;` will make them independent of your site, so they will not effect the performance of other parts of the page.

##### off-screen

`contain: paint;` as the browser paints the content completely although it is not visible on load. Setting this property can help the user agent skip the paint of the off-screen element, to paint other content faster.

### [Text-rendering](https://css-tricks.com/almanac/properties/t/text-rendering/)

Lets you choose quality of text over speed (or vice versa).

#### As for performance

Apply it only if you know what the maximum text length will be.
