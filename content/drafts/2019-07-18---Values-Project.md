---
title: Values Project, Performance, and Web Components
template: 'draft'
draft: true
slug: '/posts/7-18-19/'
category: 'Web Components'
tags:
  - 'Project'
  - 'Web Components'
  - 'Performance'
  - 'CDNs'
description: 'Started work on my project. But there is a lot to do still. Performance, it is so very nuanced. Web components are the way to go for small projects for now on. React is unnecessary.'
---

## TL;DR

- A little about the plan for my project on values.
- The fact that even large companies managing major CDN's do not use the stream of data the browsers give them ideally. That is, they do not prioritise the sending of images, as those that are above the fold should be displayed prior to those that are not. But some CDN's do prioritise.
- Custom elements. Went through the info, learned quite a bit.

## This is cool

https://www.nationalgeographic.com/science/2019/07/the-atlas-of-moons/

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

## And that's the main gist, goal is to get this all done today so I can genuinely begin my job search.

## Performance meetup

[Patrick Meenan video](https://www.youtube.com/watch?v=ct5MvtmL1NM)

### font-display

[CSS tricks](https://css-tricks.com/font-display-masses/)

### Layers Dev tool tabs Layer section

### https://github.com/andydavies/http2-prioritization-issues

http2 allows the server to decide what type of files are prioritised. CSS prior to images. Images above the fold over images that are below the fold.

- https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf

- https://speedcurve.com/

UX speed instead of performance

## Custom Elements v1: Reusable Web Components

### How to define

```js
class AppDrawer extends HTMLElement {...}
window.customElements.define('app-drawer', AppDrawer);

// Or use an anonymous class if you don't want a named constructor in current scope.
window.customElements.define('app-drawer', class extends HTMLElement {...});
```

which you can then use as so:

`<app-drawer></app-drawer>`

### Defining an element's JS API

You need to use the `class` syntax and extend HTMLElement

```js
class AppDrawer extends HTMLElement {

  // A getter/setter for an open property.
  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
    this.toggleDrawer();
  }

  // A getter/setter for a disabled property.
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    // Reflect the value of the disabled property as an HTML attribute.
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();

    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      // Don't toggle the drawer if it's disabled.
      if (this.disabled) {
        return;
      }
      this.toggleDrawer();
    });
  }

  toggleDrawer() {
    ...
  }
}

customElements.define('app-drawer', AppDrawer);
```

Basically, you can encapsulate all the logic you need directly in the element.

### this

`this` inside a class definition refers to the DOM element itself.

- Can even use `this.querySelectorAll('.items')`
  - An interesting fact, if you query select with a specific element, you can only find children in this query.

### Rules on creating custom elements

1. Name must contain a dash.
2. You cannot register the same tag more than once.
3. Custom elements cannot be self-closing.

### Custom element reactions (Lifestyle methods)

#### constructor

When an instance of the element is created or upgraded. State can be initialised, event listener setup, or creating

#### connectedCallback

Called every time the element is inserted into the DOM. Can run setup code (fetch resources or rendering). Work should be delayed until this time.

#### disconnectedCallback

Called every time the element is removed from the DOM, useful to clean up code. Will not be called if the user closes the tab (or something similar).

#### attributeChangedCallback(attrName, oldVal, newVal)

Called when an observed attribute has been added, removed, updated, or replaced.

#### adoptedCallback

Custom element has been moved into a new document

### Adding these lifecycle methods to the element

```js
class AppDrawer extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.
    ...
  }
  connectedCallback() {
    ...
  }
  disconnectedCallback() {
    ...
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    ...
  }
}
```

### Properties and attributes

#### Reflecting properties to attributes

Useful when you want to keep the element's DOM representation in sync with its JS state.

If you want to add some functionality for css like this:

```css
app-drawer[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
```

then you can do this:

```js
get disabled() {
  return this.hasAttribute('disabled');
}

set disabled(val) {
  // Reflect the value of `disabled` as an attribute.
  if (val) {
    this.setAttribute('disabled', '');
  } else {
    this.removeAttribute('disabled');
  }
  this.toggleDrawer();
}
```

#### Observing changes to attributes

```html
<app-drawer open disabled></app-drawer>
```

Observe these attributes as so:

```js
class AppDrawer extends HTMLElement {
  ...

  static get observedAttributes() {
    return ['disabled', 'open'];
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  // Only called for the disabled and open attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    // When the drawer is disabled, update keyboard/screen reader behavior.
    if (this.disabled) {
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-disabled', 'false');
    }
    // TODO: also react to the open attribute changing.
  }
}
```

And you can use the `attributeChangedCallback` to keep a JS property in sync with its attribute.

### Element upgrades

#### Progressively enhanced HTML

Custom elements can be used _before_ their definition is registered.

Using `define()` and endowing an element with a class definition is known as an element upgrade

`window.customElements.whenDefined('some-element')` creates a Promise that resolves when the element becomes defined

```js
<share-buttons>
  <social-button type="twitter"><a href="...">Twitter</a></social-button>
  <social-button type="fb"><a href="...">Facebook</a></social-button>
  <social-button type="plus"><a href="...">G+</a></social-button>
</share-buttons>



// Fetch all the children of <share-buttons> that are not defined yet.
let undefinedButtons = buttons.querySelectorAll(':not(:defined)');

let promises = [...undefinedButtons].map(socialButton => {
  return customElements.whenDefined(socialButton.localName);
));

// Wait for all the social-buttons to be upgraded.
Promise.all(promises).then(() => {
  // All social-button children are ready.
});
```

Custom elements state is either `undefined`, `uncustomised`, or `custom`.

### Element-defined content

#### Creating an element that uses Shadow DOM

```html
<template id="x-foo-from-template">
  <style>
    :host {
      color: green;
    }
  </style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
  let tmpl = document.querySelector('#x-foo-from-template');
  // If your code is inside of an HTML Import you'll need to change the above line to:
  // let tmpl = document.currentScript.ownerDocument.querySelector('#x-foo-from-template');

  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the constructor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
    ...
  });
</script>
```

`template` element clones the DOM. It allows you to declare fragments of the DOM which are parsed, inactive at page load, and can be activated during the runtime.

This is an example of the Shadow DOM. It allows you to create a local DOM with internal CSS scoped to the element.

Scoping styles to an element with `:host`.

### Styling a custom element

#### Pre-styling unregistered elements

```css
app-drawer:not(:defined) {
  /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
  display: inline-block;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
```

`:defined` attribute only exists before... it gets definied.

### Extending elements

#### Extending a custom element

```js
class FancyDrawer extends AppDrawer {
  constructor() {
    super(); // always call super() first in the constructor. This also calls the extended class' constructor.
    ...
  }

  toggleDrawer() {
    // Possibly different toggle implementation?
    // Use ES2015 if you need to call the parent method.
    // super.toggleDrawer()
  }

  anotherMethod() {
    ...
  }
}

customElements.define('fancy-app-drawer', FancyDrawer);
```

#### Extending native HTML elements

> A customized built-in element is a custom element that extends one of the browser's built-in HTML tags. The primary benefit of extending an existing element is to gain all of its features (DOM properties, methods, accessibility).

Extending `<button>`

```js
// See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
class FancyButton extends HTMLButtonElement {
  constructor() {
    super(); // always call super() first in the constructor.
    this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
  }

  // Material design ripple animation.
  drawRipple(x, y) {
    let div = document.createElement('div');
    div.classList.add('ripple');
    this.appendChild(div);
    div.style.top = `${y - div.clientHeight / 2}px`;
    div.style.left = `${x - div.clientWidth / 2}px`;
    div.style.backgroundColor = 'currentColor';
    div.classList.add('run');
    div.addEventListener('transitionend', e => div.remove());
  }
}

customElements.define('fancy-button', FancyButton, { extends: 'button' });
```

Notice the third option of `.define` is used to extend the `button`.

Now, `FancyButton` has access to all `button` DOm properties... disabled, click, keydown, tabindex, etx.

#### Ways to use it:

Extending `button`

`<button is="fancy-button" disabled>Fancy button!</button>`

or with JS:

```js
// Custom elements overload createElement() to support the is="" attribute.
let button = document.createElement('button', { is: 'fancy-button' });
button.textContent = 'Fancy button!';
button.disabled = true;
document.body.appendChild(button);

// or this way:

let button = new FancyButton();
button.textContent = 'Fancy button!';
button.disabled = true;
```

Extending `image`

```html
<img is="bigger-img" width="15" height="20" />
```

or in JS:

```js
const BiggerImage = customElements.get('bigger-img');
const image = new BiggerImage(15, 20); // pass constructor values like so.
console.assert(image.width === 150);
console.assert(image.height === 200);
```

#### Misc Details

Unknown elements vs. undefined custom elements

`<randomtagthatdoesntexist>` will be created but it will be parsed as `HTMLUnknownElement`. Not as a custom element.

### API reference

#### define(tagName, constructor, options)

```js
customElements.define('my-app', class extends HTMLElement { ... });
customElements.define(
  'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
```

#### get(tagName)

Returns an element's constructor. Undefined if it has not been registered.

```js
let Drawer = customElements.get('app-drawer');
let drawer = new Drawer();
```

#### whenDefined(tagName)

Returns a Promise that resolves when the custom element is defined. Immediately resolved if it is defined. Rejects if invalid.

### History and browser support

Use this polyfill:

https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs

As so:

`npm install --save @webcomponents/webcomponentsjs`

```html
<!-- Use the custom element on the page. -->
<my-element></my-element>

<!-- Load polyfills; note that "loader" will load these async -->
<script
  src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"
  defer
></script>

<!-- Load a custom element definitions in `waitFor` and return a promise -->
<script type="module">
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  WebComponents.waitFor(() => {
    // At this point we are guaranteed that all required polyfills have
    // loaded, and can use web components APIs.
    // Next, load element definitions that call `customElements.define`.
    // Note: returning a promise causes the custom elements
    // polyfill to wait until all definitions are loaded and then upgrade
    // the document in one batch, for better performance.
    return loadScript('my-element.js');
  });
</script>
```

- Note: the :defined CSS pseudo-class cannot be polyfilled.

## something uninterestingly different

So i signed up for an AI conference for next Tuesday... hmm...

![artwork expressing artificial intelligence](https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fmarcoannunziata%2Ffiles%2F2019%2F07%2Fsensei-1200x1200.jpg)