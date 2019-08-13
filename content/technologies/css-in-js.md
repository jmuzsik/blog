---
title: CSS in JS
template: 'post'
image: "https://crypviz.io/wp-content/uploads/2017/11/QUBIT.png"
alt: "bit vs qubit"
draft: false
slug: '/technologies/css-in-js'
category: 'CSS'
tags:
  - 'CSS Philosophy'
description: 'The JAMstack is not about specific technologies. It’s a new way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience.'
---

## There is distrust for it in my mind

I mean, can't I enjoy the comforting confines of a CSS file?

```js
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// stuff...

<Title>I am title</Title>;
```

```html
<style>
  h1 {
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  }
</style>
<h1>I am just an h1, like you expect</h2>
```

This is simply much less complicated, much more comforting.

## [This article](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)

Solving naming conventions: just understand specification. And the Shadow DOM is worth exploring.

Semantics:

```js
<PersonList>
  <PersonListItem>
    <PersonFirstName>Foo</PersonFirstName>
    <PersonLastName>Bar</PersonLastName>
  </PersonListItem>
</PersonList>
```

```html
<ol>
  <li>
    <span className="{styles.firstName}">Foo</span>
    <span className="{styles.lastName}">Bar</span>
  </li>
</ol>
```

- Pure HTML is simply more intuitive and maintainable.

## [This article arguing for CSS in JS](https://mxstbr.com/thoughts/css-in-js/)

Umm... I think I am primarily annoyed that this article is full of emojis and positive vibes. It doesn't feel all that technical. But, I know I am being subjective.

This doesn't seem true as well:

> Regarding performance, CSS-in-JS libraries keep track of the components I use on a page and only inject their styles into the DOM. While my .js bundles are slightly heavier, my users download the smallest possible CSS payload and avoid extra network requests for .css files.

- If you inspect the elements it shows that the elements get a class added to them which the styles are attached to. But, it does appear you can change the document stylesheet with JS based on [this article](https://www.quirksmode.org/dom/changess.html)

### Just a note about how to change the stylesheet with JS

```js
function changeIt() {
  // Suppose you can create a new stylesheet instead of returning
  if (!document.styleSheets) return;
  var theRules = new Array();
  if (document.styleSheets[1].cssRules)
    theRules = document.styleSheets[1].cssRules;
  else if (document.styleSheets[1].rules)
    theRules = document.styleSheets[1].rules;
  else return;
  theRules[theRules.length - 1].style.backgroundColor = '#EEF0F5';
}
```

But I still really dislike the styles class names that are created by css in js, you get crap like this: `jnjCzu`.

## Conclusion

There likely are several benefits to CSS in JS but I do not see a good reason to alter the tried and true way of separating concerns. If so, likely the best way will relate to utilising the Shadow DOM. Though, I know that regular use of it is some time away. Maybe developers simply do not like to use kebab-case or the libraries that are hip which they like utilise CSS in JS.

Though, the documentation for regular CSS is much more extensive and informative. Perhaps it is laziness?
