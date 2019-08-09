---
title: Values and a little about Svelte
template: 'draft'
draft: true
slug: '/posts/7-15-19/'
category: 'Values'
tags:
  - 'Values'
  - 'Svelte'
  - 'Personal Project'
description: 'This began as a look into values at companies, to decide what is really important for me. But, it ended up with me collecting values of a variety of companies to create a data vis website in conjunction. Began learning Svelte (which the site will be written in).'
---

## Method to the writing

> This is the companies explanation

- If this, it's a note.

My interpretation is here.

## Facebook's

[Values](https://www.facebook.com/careers/facebook-life)

### Be Bold

> Building great things means taking risks. We have a saying: "The riskiest thing is to take no risks." in a world that's changing so quickly you're guaranteed to fail if you dont take any risks.

- There is oddly a spelling error in their site - dont should be don't.

Socially, call people out. Life-wise, don't be afraid to step out of your comfort zone and if an idea comes along that you cannot let go, act upon it.

### Focus on Impact

> To make the most impact, we need to solve the most important problems. We expect Facebook employees to avoid wasting time on minor issues and focus on truly big challenges.

Impact: have a strong effect on someone or something.

Put your effort on the concepts more so than the details. Look deeply into what you do rather than the surface level.

### Move Fast

> We believe that it’s better to move fast and make mistakes than to move slowly and miss opportunities. Doing so enables us to build more things and learn faster.

Trust your instinct.

### **I was going to go further but instead I compiled a bunch of data of various companies values and stored it on github: https://github.com/jMuzsik/blog/blob/master/data.js**

## The plan:

Create a very simple site with Svelte to display this data cleanly. Create a way for people to more easily find values for their selves or their company. A kind of database of values. I should spend another 8 or so hours gathering data prior.

## Svelte

### What is Svelte?

> Svelte converts your app into ideal JavaScript at build time, rather than interpreting your application code at run time. This means you don't pay the performance cost of the framework's abstractions, and you don't incur a penalty when your app first loads.

#### But what is the difference between Run-time and Build Time? [Stack Overflow Answer](https://stackoverflow.com/questions/846103/runtime-vs-compile-time)

- Compile (or Build) Time: the time period in which you, the developer, are compiling your code.
- Run Time: the time period which a user is running your piece of software.

### Most basic file

File must end with `.svelte`

```html
<script>
  let name = 'World!';
</script>
<h1>Hello {world}!</h1>
<style>
  h1 {
    color: green;
  }
</style>
```

### Styling scope

All styles are scoped to a component

### Nested Components

```html
<!-- Nested.svelte -->
<p>This is another paragraph</p>
```

```html
<script>
  import Nested from './Nested.svelte';
</script>

<p>This is a paragraph.</p>
<Nested />
<!-- Renders the other paragraph -->
```

### Rendering HTML similarly to `dangerouslySetInnerHTML` in React

`{@html post.content}`

### Build Tools

[Svelte-loader](https://github.com/sveltejs/svelte-loader)

- Uses Webpack

### Handling Events

```html
<script>
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click="{handleClick}">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

To be continued...