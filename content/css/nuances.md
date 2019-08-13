---
title: CSS Nuances
template: 'post'
image: "https://cdn.iconscout.com/icon/free/png-256/css3-9-1175237.png"
alt: "css logo"
draft: false
slug: '/css/nuances'
category: 'CSS'
tags:
  - 'Nuances'
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

Basically, `.some-class__thing-in-class`

### What happens when you alter a CSS property after the DOM has loaded?

https://csstriggers.com
