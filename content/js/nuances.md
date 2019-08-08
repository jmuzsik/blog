---
title: JavaScript Nuances
date: '2019-08-08'
template: 'post'
draft: false
slug: '/js/nuances'
category: 'Javascript'
tags:
  - 'Nuances'
description: 'Some nuances of JS to be updated occasionally.'
---

## Things to remember about Javascript

### Traversal through the tree

```js
// Traversal up and down the tree
const el = document.querySelector('.some-el');
const parent = el.parentNode;
const firstChild = el.firstChild;
const lastChild = el.lastChild;
const children = el.childNodes;

// Traversal left and right
const previousSibling = el.previousSibling;
const nextSibling = el.nextSibling;
```

### DocumentFragment

> A common use for `DocumentFragment` is to create one, assemble a DOM subtree within it, then append or insert the fragment into the DOM using Node interface methods such as `appendChild()` or `insertBefore()`. Doing this moves the fragment's nodes into the DOM, leaving behind an empty DocumentFragment. Because all of the nodes are inserted into the document at once, only one reflow and render is triggered instead of potentially one for each node inserted if they were inserted separately.

```html
<ul id="list"></ul>

<script>
  var list = document.querySelector('#list');
  var fruits = ['Apple', 'Orange', 'Banana', 'Melon'];

  var fragment = document.createDocumentFragment();

  fruits.forEach(function(fruit) {
    var li = document.createElement('li');
    li.innerHTML = fruit;
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
</script>
```

- So, if you ever need to create a bunch of elements on the fly, use `DocumentFragment` to prevent the DOM from updating more than once.

### Cache DOM nodes

- Cache created DOM nodes, and use them as a pool of pre-assembled elements you can put back in the page as needed.
  - So if for whatever reason you need to create lots of elements for common use cases, cache these elements, be prepared in a way? I wonder what React does
