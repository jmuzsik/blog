---
title: Think Fast, First
template: 'post'
draft: false
slug: '/performance/think-fast-first'
category: 'Performance'
tags:
  - 'Talks'
description: 'Notes at a talk at a meetup about creating a performance minded culture.'
---

### How to convince the boss

By collecting analytics from the following resources:

#### [webpagetest](https://www.webpagetest.org/simple)

- Can also block out specific hostnames (cdn's, etc)

#### RUM

[`perfume.js`](https://github.com/Zizzamia/perfume.js) is a simple way to find this data. It has a better breakdown than GA.

#### Most important metrics

[First input delay](https://developers.google.com/web/updates/2018/05/first-input-delay)

- Measures time when the user first interacts with your site to the time when the browser can actually handle the interaction.

#### [thinkwithgoogle](https://www.thinkwithgoogle.com/)

You can check estimated revenue gained from performance improvements from this site.

### JS

### Why is JS different?

200kb of JS !== 200kb of jpg

JS = download -> parse -> compile -> execute

### How to make JS faster

#### Does the user need this right now?

Infer by user actions

- Use `intersectionObserver API` for infinite loading. Keep track of middle element in a Feed or the like.

#### Progressive enhancements

If you can do something with CSS, do it

- CSS Target - href & id

- Details and Summary from HTML5
  - [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

#### Web Workers

Use it for everything except when you literally cannot as the work leaves the Main Thread

- You can use as many as you want, and they will never block the UI (just get a callback at the end)

`postMessage`

- [article](https://dassur.ma/things/is-postmessage-slow/)

#### [https://dassur.ma/](https://dassur.ma/) looks like it has some good stuff

#### [Worker DOM](https://github.com/ampproject/worker-dom)

- Interacting with the DOM without blocking the main thread

### The main bottleneck at Hearst

1. First Party: 11 requests
2. Tag Manager: 7th request

- Leads to 125 Requests (from Ad's, or other things). So they receive 100's of ads containing unknown files.

#### Serverless Proxy

Lambda -> loads page with ?third-parties -> groups them and stores them in s3 and then stores the urls to Redis (to allow you to load Ads from your domain instead of from the Advertisers domain) -> invalidate at a scheduled time (when new ads will be delivered) and repeat

- This will also allow you to do optimisations on the ads and check for what the ads do (if they do malicious things).

### Cultural principle

Performance is not a bug fix, it's feature development (a business incentive)

#### How can you improve performance in your development cycle?

Divide and Conquer

1. Server performance
2. Application performance
3. Development performance (teach developers how they are writing slow code)

#### Focus on developers

Resource to teach with: [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

#### Abstract frequent optimisations

`getBoundingClientRect` is very expensive

Use `intersectionObserver` as it has a bunch of properties that are automatically accessible such as `getBoundingClientRect`

#### Developer challenges

Developers were challenged by constraints.

Features too longer to finish

Education without _immediate action_ is quickly forgotten

#### Product and Design

Old way: Idea -> prototype -> test -> development -> MVP -> optimise

Performance should happen at the Idea phase

#### Document your tradeoffs

Is it by design? Is it a technical limitation?

#### Plan your tradeoffs

Describe the scenarios a tradeoff would block - We can block this but then this will be a problem or this, on and on - Make decisions as you go

#### How do we stay fast?

Performance budgets are great but it's rarely a single pull request

#### Spotter CI (not open source atm)

Collects all open PRs with labels -> merges into temporary branch -> then an additional PR to be checked by product folks (to check multiple PR's simultaneously)

#### [Lightkeeper](https://github.com/lfre/lightkeeper)
