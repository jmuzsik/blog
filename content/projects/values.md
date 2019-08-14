---
title: Values
template: 'post'
draft: false
slug: '/projects/values'
category: 'Projects'
tags:
  - 'Values'
  - 'Projects'
description: 'A WIP project about values that companies have.'
---

## What is it?

I compiled a bunch of data from companies by manually going through their websites and gathering the key/values that they associate with.

- [This is the data](https://github.com/jMuzsik/values/blob/master/src/valuesData.js) (though it has some data parsing JS written below it).

## The current iteration of the project: [this link](https://github.com/jMuzsik/values)

And, it's so incredibly rough that I have not yet deployed it. Basically, all it does right now is count specific words within the data with an attempt to find patterns.

## What the heck am I doing with this project

### Color and Logo

Logo... maybe just steal this:

![logo of a heart signifying values](https://dwyl.com/img/common/dwyl-heart-only-logo.png)

So that'll be in the color palette: `rgb(81, 191, 169)`

- Greenish color palette I suppose
- Coolors picked these... css variables:
  - --textColor: #302D30; /_ Change this as you go along, they gave black initially _/
  - --primary: #55AAAA;
  - --light: #80FF80;
  - --light-primary: #4DCCB3;
  - --dark-primary: #008080;

## Layout

Top will be a super simple nav thing with several links

- Table link
- Charts link
- Github link

## Charts

I should replace the bar chart with a bubble chart.

Pie chart for basically the same data in the bubble chart. Or polar chart

Both should be toggle-able. Show whichever is more interesting first

- The charts I'll have will be Keys and values separate. Keys and values combined. So there will be a total of 6 tables
  - 3 pie charts, 3 bubble charts

## Table

I'll just write this with pure CSS/HTML.

This can be toggle-able as well. The same idea as the charts, same data.

There should be search capabilities, lazy loading, and other performance optimisations.
