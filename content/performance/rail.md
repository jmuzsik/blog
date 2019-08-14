---
title: RAIL Model
template: 'post'
draft: false
slug: '/performance/rail-model'
category: 'Performance'
tags:
  - 'RAIL'
description: 'About the RAIL model for performance.'
---

## R(esponse)

Basically, any time a user interacts with anything on your page, they should not have to wait more then 50 seconds to see a **response**.

## A(nimation)

> ... the key is to do nothing where you can, and the absolute minimum where you can't

- You need to make sure there are no background tasks that can effect the flow of repainting running while the animation is running. When an animation occurs, it should be able to do it's thing quickly, and move on.

## I(dle)

Maximise idle time

- Basically, in the background, at all times, each chunk of data being parsed into the webpage should take less than 50ms to run. And, if a user interacts with the webpage, this background work ought to be set aside, and restarted after the user does their thing. So there should be as much idle time as possble so that the user does not have to compete with what is occurring in the background.

## L(oad)

The basic principle is to deliver content and for the page to become interactive in under 5 seconds.

## Measuring RAIL

### Analyse frames per second

Open the performance tab in chrome dev tools, then lower the CPU ~ around 4x slower. Record. Move around the page and click here and there. Look for places where the FPS < 60. Optimise around that.

- Or use this simple tool:
  - `Command+Shift+P` -> `Show Rendering` -> enable `FPS Meter`
