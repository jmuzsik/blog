---
title: Performance again mainly
date: '2019-07-16'
template: 'draft'
draft: true
slug: '/posts/7-16-19/'
category: 'Performance'
tags:
  - 'Svelte'
  - 'Performance'
  - 'A lot about performance'
description: "First, a listing of the technologies that Thoughtworks has said to adopt. Then there a lot about performance. I continued learning Svelte until I realised I don't want to leave the React ecosystem, this is not the time to learn Svelte."
---

## TL;DR

1. Thoughtworks stuff that is mainly about problems you may have in large scale systems.
2. Maybe I should learn how to integrate with WeChat.
3. Echarts sounds cool.
4. Contentful may be worth working with
5. Svelte is another world I'm not up to learn atm, new job and new apartment and new... more personal stuff first.
6. `intersectionObserver` looks dope
7. `details` and `summary` is what's up
8. Web workers likely should be used all the time if you're working in a large scale system.
9. Serverless proxy is a nice idea
10. What forces layout/reflow article has great info
11. Cats

## Thoughtworks Tech Radar Vol 17 (2017) - Why? It was loaded and I had no internet atm

### What's New

#### Open source rise in China

Why?

> The prospect of working on cutting-edge open source projects with other smart developers is a universal incentive.

#### Cloud as the new normal

> Instead of asking, “Why in the cloud?”, many companies now ask, “Why not in the cloud?” when embarking on new projects.

- [Polycloud](https://thoughtworks.com/radar/techniques/polycloud) for using multiple cloud providers simultaneously.

### Techniques

#### Lightweight Architecture Decision Records

> a technique for capturing important architectural decisions along with their context and consequences.

- Best done straight within the code to be in sync with the code itself.

#### Applying Product Management to Internal Platforms

> means establishing empathy with internal consumers (read: developers) and collaborating with them on the design. Platform product managers establish roadmaps and ensure the platform delivers value to the business and enhances the developer experience.

- Internal platforms should be as important as what is created for the client (in a way) as it will be interconnected with the developer's future work creating a product for the client.

#### Architectural Fitness Function

> provides an objective integrity assessment of some architectural characteristics, which may encompass existing verification criteria, such as unit testing, metrics, monitors, and so on.

- [Building evolutionary architectures](https://www.thoughtworks.com/books/building-evolutionary-architectures)

#### Autonomous Bubble Pattern

> This approach involves creating a fresh context for new application development that is shielded from the entanglements of the legacy world.

- This is focused on integrating modern architecture into companies with a lot of legacy code. You create separate "bubbles" where both bubbles have full control.

#### [Chaos Engineering](https://principlesofchaos.org/)

Predominantly useful for large scale systems which you know will occasionally be subject to turbulent conditions. So, I imagine at pre-scheduled times or low-use hours you can test these conditions to see how your system reacts.

#### DesignOps

> a cultural shift and a set of practices that allows people across an organization to continuously redesign products without compromising quality, service coherency or team autonomy

- Advocates for the creation and evolution of a design infrastructure. Tools like Storybook make it a part of everyone's job.

#### Micro Frontends

> In this approach, the web application is broken down into its features, and each feature is owned frontend to backend, by a different team

- Separation of concerns. Less state to manage. Lower code bundle. Endless benefits.

#### Pipelines for Infrastructure as Code

> enables errors to be found before changes are applied to operational environments — including environments used for development and testing

- Basically pre-deploy hooks.

#### TDD'ing Containers

Literally running tests on container scripts.

#### Algorithmic IT Operations

> steady improvement in machine learning algorithms will inevitably change the role of humans in operating tomorrow’s data centers

- Tools like [Prometheus](https://thoughtworks.com/radar/tools/prometheus) are automating the ability for companies to find algorithmic bottlenecks in their applications.

#### 2019

1. Four key metrics
   - Lead time, deployment frequency, mean time to restore (MTTR) and change fail percentage.
2. Micro frontends
   - Many small apps in one app
3. Opinionated and automated code formatting
   - Automatic code formatting
4. Polyglot programming
   - Use languages based on when they are most fitting for the task at hand
5. Secrets as a service
   - For variables needed for API's, etc. use something like AWS KMS

### Platforms

#### Kubernetes is the default solution when deploying containers into a cluster of machines

#### .NET Core... maybe learn a little about it

#### Google Cloud Platform over AWS?

#### [KeyCloak](https://www.keycloak.org/)

Used to to secure the services or APIs through authentication and authorization features

#### WeChat

Commerce can completely be done on this platform. Over 70% of Chinese people utilise this platform.

### Tools

#### Headless Chrome for Front-end test

### Languages and Frameworks

#### Clara Rules

[What is this?](https://www.clara-rules.org/)

#### Perhaps use Echarts in the future

Why? It is entirely based on the Canvas API so performance is great.

#### If you ever need to create something for the bare metal

[Gobot](https://gobot.io/) is written in Go and supports many platforms.

#### [Single-SPA](https://github.com/CanopyTax/single-spa)

> a JavaScript metaframework that allows us to build micro frontends using different frameworks that can coexist in a single application

### 2019

1. Contentful
   - A headless CMS.
     - The term “headless” comes from the concept of chopping the “head” (the front end, i.e. the website) off the “body” (the back end, i.e. the content repository)

### Tools

1. Cypress
   - End-to-end testing.

## Svelte continued

### if/else if/else

```js
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

### Iteration

```js
{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
		{i + 1}: {cat.name}
	</a></li>
{/each}
```

or with destructuring

```js
{#each cats as {id, name}}
...
{/each}
```

This is gonna take too long. Just use create-react-app

## How to make the App

1. Do all data manipulation prior to putting it into the app.
2. There are a few thing I want to discern 1.

## Talk at Web Performance Meetup

### How to convince

Analytics collected from the following resources

#### webpagetest

- /simple
- Can also block out specific hostnames (cdn's, etc)

#### RUM

[`perfume.js`](https://github.com/Zizzamia/perfume.js) is a simple way to find this data. Better breakdown than GA.

#### Most important metrics

[First input delay](https://developers.google.com/web/updates/2018/05/first-input-delay)

- Measures time when the user first interacts with your site to the time when the browser can actually handle the interaction.

#### developers.google.com and thinkwithgoogle.com

Can check revenue with thinkwithgoogle

### JS

### Why is JS is different?

200kb of JS !== 200kb of jpg

JS = download -> parse -> compile -> execute

[Cost of JS in 2019](https://v8.dev/blog/cost-of-javascript-2019)

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

#### Waterfall

1. First Party: 11 requests
2. Tag Manager: 7th request

- Leads to 125 Requests (from Ad's, or other things)

### Dentist analogy

- Important but no one likes going to the dentist
  - Nothing is going to change if we keep eating candy (third party = revenue)

### How to work around Third Party Ads/or the like

#### Serverless Proxy

Lambda -> loads page with ?third-parties -> groups them and stores them to s3 and store the urls to Redis (load Ads from your domain) -> invalidate at a scheduled time (when new ads will be delivered) and repeat

- Do optimisations and check for what the ads do (if they do malicious things)

### Performance is not a bug fix, it's feature development (a business incentive)

#### How can you improve performance in your development cycle?

Divide and Conquer

1. Server performance
2. Application performance
3. Development performance (teach developers how they are writing slow code)

#### Focus on developers

Resource to teach with: [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

#### Abstract frequent optimisations

`getBoundingClientRect` is very expensive

Use `intersectionObserver` has a bunch of properties that are automatically accesible such as `getBoundingClientRect`

Do not use `click` event, use `touchstart`

#### Is it worth it?

Is it part of the critical path?

How frequent will it run?

Biggest question: Is it a shared or base component?

#### Your one-off is someone's pattern

#### Developer challenges

Developers were challenged by constraints.

Features too longer to finish

Education without _immediate action_ is quickly forgotten

#### Product and Design

Old way: Idea -> prototype -> test -> development -> MVP -> optimise

Performance should happen at the Idea phase

#### Performance Paths

Why are we doing this? Goal

Align best practices

Render (how fast to load) vs Runtime (users stick longer)

Mobile vs Desktop

#### Document your tradeoffs

Is it by design? Is it a technical limitation?

#### Plan your tradeoffs

Describe the scenarios a tradeoff woul dblock - We can block this but then this will be a problem or this, on and on - Make decisions as you go

#### How do we stay fast?

Performance budgets are great but it's rarely a single pull request

#### Spotter CI (not open source atm)

Collects all open PRs with labels -> merges into temporary branch -> then an additional PR to be checked by product folks (to check multiple PR's simultaneously)

#### [Lightkeeper](https://github.com/lfre/lightkeeper)

## Lastly

Umm... [Henri the existential cat](https://www.youtube.com/watch?v=OUtn3pvWmpg)
