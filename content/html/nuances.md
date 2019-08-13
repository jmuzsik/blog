---
title: HTML Nuances
template: 'post'
image: "https://image.flaticon.com/icons/png/512/36/36986.png"
alt: "html logo"
draft: false
slug: '/html/nuances'
category: 'HTML'
tags:
  - 'Nuances'
description: 'Some HTML nuances to updated here and there.'
---

## Keep it semantic™

`<header>` header for document or individual section

- Same with footer, but opposite

`<main>` main content of a document

`<article>` self contained composition in a document. Intended to be distributable or reusable.

`<aside>` portion of document only indirectly related to main content

`<section>` standalone section in document, generally with a header

`<details>` and `<summary>`

- This will create an accordion, summary is the title, text is what is seen when clicked

```html
<details>
  <summary> Details </summary>
  Something small enough to escape casual notice.
</details>
```

`<dialog>` similar to a notification

```html
<dialog open>this is seen</dialog>
<dialog>this is not seen</dialog>
```

`<figure>` and `<figcaption>`

- Used for an image that has a description. The description is right below the image.

```html
<figure>
  <img ... />
  <figcaption>...</figcaption>
</figure>
```

`<mark>` Highlights text

`<nav>` For a section of a page that provides navigation links

`<meter>` creates a battery looking thing

- It even changes colors based on the low/high/optimum values

```html
<label for="fuel"> Fuel level: </label>
<meter
  id="fuel"
  name="fuel"
  min="0"
  max="100"
  low="33"
  high="66"
  optimum="80"
  value="50"
>
  this is like the alt
</meter>
```

`<progress>` shows indicator for the completion progress of a task

```html
<label for="file"> File progress: </label>
<progress id="“file”" max="“100”" value="“30”">
  alt for it
</progress>
```

`<summary>` for a summary, caption, or legend for `<details>`

`<time>` represents a specific period in time.

```html
<!-- date time can represent three forms of time -->
<!-- Precise date -->
<time datetime="2018-07-07"> July 7 </time>
<!-- Time on a 24 hour clock -->
<time datetime="20:00"> 20:00 </time>
<!-- A valid time duration -->
<time datetime="PT2H30M"> 2h 30m </time>
```

`<dl>` - for a row of definitions

- `<dt>` - is the word
- `<dd>` - is the definition

Write way to do a form:

```html
<form>
  <fieldset>
    <legend>...</legend>
    <!-- inputs and other stuff -->
  </fieldset>
</form>
```

And now for something completely different:

![he's the most dangerous of animals, a clever sheep](https://66.media.tumblr.com/7f3685352beb94a4b3038b5de223082e/tumblr_p9k8au6cY41xufl2to7_250.gif)
