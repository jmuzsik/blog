---
title: How to think about performance tools
template: 'post'
draft: false
slug: '/performance/7-14-19/'
category: 'Performance'
tags:
  - 'Performance Tools'
description: 'The ideas/concepts to think about when making the corresponding decision.'
---

## https://developers.google.com/web/fundamentals/performance/speed-tools/

### Lab vs Field Data

#### Lab

Controlled environments with predefined device and network settings

- Use Lighthouse and WebPageTest

#### Field or Real User Monitoring (RUM)

Performance data collected from real page loads your users are experiencing in the wild

- Chrome User Experience Report and PageSpeed Insights

### Tools focused on increasing revenue

[Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/) for mobile site speed based on real-world data from the Chrome UX Report. Used also to check how your site speed compares against your peers in more than ten countries.

[Impact Calculator](https://www.thinkwithgoogle.com/feature/testmysite) for estimating potential revenue opportunity of improving mobile site speed based on Google Analytics data

[TestMySite](https://www.thinkwithgoogle.com/feature/testmysite) for testing your page's mobile loading time alongside industry benchmarks and to learn simple fixes (powered by WebPageTest and PageSpeed Insights)

### The problem with Google Lighthouse

It is _synthetic_ (in controlled environments with predefined device and network settings) testing. It does not tell you how your site is performing for real page loads _your users are experiencing in the wild_.
