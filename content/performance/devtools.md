---
title: Performance Devtools
template: 'post'
image: 'https://developers.google.com/web/progressive-web-apps/images/pwa-lighthouse.png'
alt: 'google lighthouse logo'
draft: false
slug: '/performance/devtools'
category: 'Performance'
tags:
  - 'Critical Rendering Path'
description: 'Things to utilise in the devtools for performance.'
---

### Use Chrome DevTools to quickly identify paint bottlenecks

Performance -> command + shift + p -> paint flashing

- Screen will flash whenever paint happens on an element

### Simplify paint complexity

Use the `Paint Profiler`

[How to get to it](https://stackoverflow.com/questions/38437722/no-paint-profiler-in-chrome-devtools)

- It will tell you the performance of the styling used.

### Layers Dev tool tabs Layer section

The one where you get this 3d view of the layers of the webpage.