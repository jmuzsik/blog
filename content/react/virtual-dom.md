---
title: Virtual DOM
template: 'post'
draft: true
slug: '/react/virtual-dom'
category: 'React'
tags:
  - 'Virtual DOM'
description: 'A tiny draft about what the Virtual DOM is.'
---

## On the topic of React, really, what is the virtual DOM

My notes state this:

• Recursively nested objects that reference DOM elements. And the references are, if I’m remembering correctly, a linked list of elements, with algorithms and data structures behind to properly handle the list. There is also other little optimisations that I don’t understand well enough. lot’s of recursion.

- It is basically a bunch of calls to `new whateverElementIsReferencedInObject`, `element.addEventListener`, `element.className = ...`, etc.

Which is...?

This is a complete work in progress.
