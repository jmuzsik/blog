---
title: Rendering Performance
template: 'post'
draft: false
slug: '/performance/rendering-performance'
category: 'Performance'
tags:
  - 'User perception'
  - 'Performance'
description: 'A little about rendering performance.'
---

## User Perception Of Performance Delays

### | 0 to 16ms

- Users are exceptionally good at tracking motion, and they dislike it when animations aren't smooth. They perceive animations as smooth so long as 60 new frames are rendered every second. That's 16ms per frame, including the time it takes for the browser to paint the new frame to the screen, leaving an app about 10ms to produce a frame.

### | 0 to 100ms

- Respond to user actions within this time window and users feel like the result is immediate. Any longer, and the connection between action and reaction is broken.

### | 100 to 300ms

Users experience a slight perceptible delay.

### | 300 to 1000ms

- Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages or changing views represents a task.

### | 1000ms or more

- Beyond 1000 milliseconds (1 second), users lose focus on the task they are performing.

### | 10000ms or more

- Beyond 10000 milliseconds (10 seconds), users are frustrated and are likely to abandon tasks. They may or may not come back later.

## Jank

Basically, if there is perceptible delay on the screen, a user experiences jank.

- Devices refresh their screen 60 times a second, so whatever code is running within a single frame should take (1s (1000ms) / 60) = `16.66ms`. But "housekeeping" occurs as well. So it is closer to `10ms`. If your processes take more than `10ms` the frame rate drops. You don't want that. You want to keep that 60 frames per second.

## The process of code -> screen when visual changes occur or the Pixel Pipeline

![pixel pipeline representation](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

1. JS - explains itself
2. Style Calculations - figuring out which elements to style based on selectors.
3. Layout - Calculate spacing of each element on the screen. Calculates element's geometry.
4. Paint - Filling in pixels. It involves drawing out text, colors, images, borders, and shadows, essentially every visual part of the elements. The drawing is typically done onto multiple surfaces, often called layers.
5. Compositing - Orders the layers in the page correctly.

### Sometimes the whole pipeline is not utilised

1. JS / CSS -> Style -> Layout -> Paint -> Composite
   - Browser has to check all the other elements and "reflow" the page.
2. JS / CSS -> Style -> Paint -> Composite
   - If changing "paint only" property, Layout is skipped
3. JS / CSS -> Style -> Composite
   - No affect on paint or layout. Only compositing.
