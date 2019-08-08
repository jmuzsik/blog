---
title: CSS Nuances
date: '2019-08-08'
template: 'post'
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
