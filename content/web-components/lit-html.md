---
title: Lit HTML
template: 'post'
draft: true
image: 'https://www.webcomponents.org/assets/logo-192x192.png'
alt: 'web components logo'
slug: '/web-component/lit-html'
category: 'Web Components'
tags:
  - 'Lit HTML'
description: 'Some notes on Lit HTML.'
---

## lit-html

### Templates

```js
html`
  <h1>Hello ${name}</h1>
`;
```

Tend to be written in functions (when state is updated).

```js
let myTemplate = data => html`
  <h1>${data.title}</h1>
  <p>${data.body}</p>
`;
```

- Lazily rendered. Basically, a JS object is created but nothing happens to the DOM until rendering.

### Rendering

```js
const result = myTemplate({ title: 'Hello', body: 'lit-html is cool' });
render(result, document.body);
```

To be continued...
