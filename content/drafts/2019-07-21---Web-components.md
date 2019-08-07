---
title: Mainly about The Silurian Hypothesis
date: '2019-07-21'
template: 'draft'
draft: true
slug: '/posts/7-21-19/'
category: 'Web Components'
tags:
  - 'Web Components'
  - 'lit-html'
  - 'PWA starter kit'
  - 'Anthropocene'
  - 'The Silurian Hypothesis'
description: 'Finishing up on the docs about web components. Began actually writing code for the project, starting with the PWA starter kit. Then some heavy stuff about The Silurian Hypothesis. An industrial revolution may have happened on the earth already... it may be a cycle.'
---

## TL;DR

1. Progressive web app starter kit is the way to go. lit-html. Good ideas, but I wish there was more investment, it seems like just one dude writing code for the repo.
2. While there have been eras of similar climate change, these previous eras did not spike as much as human civilisation has. The release of carbon was a few hundred thousand years, not several thousand. So, if humans did exist and will go extinct rapidly, we need to look closer at the rocks for sudden spikes in carbon (if previous humans followed the same process we have).
3. The astrobiological perspective, be sustainable now and we will leave a smaller trace, perhaps similar to the few hundred thousand years above (but the spike at the beginning is still necessary to prove this hypothesis).
4. The idea of fossil-fuel-driven cycles of civilization. More fossil fuels released => less oxygen levels in the ocean => conditions needed to make fossil fuels like oil and coal.
   > ...a civilization and its demise might sow the seed for new civilizations in the future.
5. anthropocene: relating to or denoting the current geological age, viewed as the period during which human activity has been the dominant influence on climate and the environment.

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

And I now realise that I'm going to use the PWS starter kit for this project, so on to those docs.

## PWA Starter Kit

### [For referential purposes, sample applications](https://pwa-starter-kit.polymer-project.org/sample-apps)

### How they recommend to write classes

#### Private and public properties/methods

`publicProperty: { type: Number }`
`_privateProperty: { type: String }`

- It's not actually private, rather it's for semantic reasons.

#### 460px is the only breakpoint

Can trigger JS whenever screen is minimised.
> If you want to run specific JavaScript code when the size changes from a wide to narrow screen (for example, to make the drawer persistent, etc), you can use the installMediaQueryWatcher helper from pwa-helpers.

#### Be very careful with redux

> If your application is using Redux, and the view is connected (like my-view2 for example), then it will get notified any time the Redux store changes, which could trigger render() to be called. 

##### How to get around the redux problem

Views inherit from `PageViewElement` instead of `LitElement`

#### More details about the [PWA-helpers library](https://github.com/Polymer/pwa-helpers)

Basically helper functions that you can call in specific parts of the application to be run every single time the specified functionality is occurring. (overcomplicated explanation)

##### router.js

`installRouter((location) => handleNavigation(location));`
    - The `handleNavigation` function is located in `src/actions/app.js`.
    - 1st param is the history object and the second is the event object.

##### network.js

Just returns true or false if the user is online.

##### metadata.js

Has several attributes that can be changed.

1. title
2. description
3. url
4. image
5. imageAlt

- It's sort of like React Helmet. Can specify specific metadata for each view.

##### mediaquery.js

```js
installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
  console.log(matches ? 'wide screen' : 'narrow sreen');
});
```

## And other stuff

Short one. Thinking to go back to school. http://www.citytech.cuny.edu/biological/biomedical-informatics-bs.aspx

Bioinformatics, a marriage of my two loves. Science and programming. It's time to go back to school. Two main focuses. Work and school.

### The Silurian Hypothesis

![ancient skeletons excavated](https://cdn.theatlantic.com/assets/media/img/mt/2018/04/RTSUXON/lead_720_405.jpg?mod=1533691499)

It is based on the a research paper that is described as so:

> If an industrial civilization had existed on Earth many millions of years prior to our own era, what traces would it have left and would they be detectable today? We summarize the likely geological fingerprint of the Anthropocene, and demonstrate that while clear, it will not differ greatly in many respects from other known events in the geological record. We then propose tests that could plausibly distinguish an industrial cause from an otherwise naturally occurring climate event.

[Link here](https://arxiv.org/abs/1804.03748)

#### But how can we find this out?

> ...the geologic record doesn’t go back past what’s called the Quaternary period 2.6 million years ago. ... Go back much farther than the Quaternary and everything has been turned over and crushed to dust.

    - So the furthest we can see, in terms of capably detecting prior human activity, is 2.6 million years.

#### So, could researchers find clear evidence that an ancient species built a relatively short-lived industrial civilization long before our own?

> Perhaps, for example, some early mammal rose briefly to civilization building during the Paleocene epoch about 60 million years ago. There are fossils, of course. But the fraction of life that gets fossilized is always minuscule and varies a lot depending on time and habitat. It would be easy, therefore, to miss an industrial civilization that only lasted 100,000 years—which would be 500 times longer than our industrial civilization has made it so far.

#### An attempt at an answer

> ...(we need) to figure out what evidence we’d leave behind if human civilization collapsed at its current stage of development.

And this is answerable as `...humanity’s collective activity is laying down a variety of traces that will be detectable by scientists 100 million years in the future.`

#### How so?

> The extensive use of fertilizer, for example, keeps 7 billion people fed, but it also means we’re redirecting the planet’s flows of nitrogen into food production. Future researchers should see this in characteristics of nitrogen showing up in sediments from our era.

> Likewise our relentless hunger for the rare-Earth elements used in electronic gizmos. Far more of these atoms are now wandering around the planet’s surface because of us than would otherwise be the case. They might also show up in future sediments

#### But there are better ways to find out:

> When we burn fossil fuels, we’re releasing carbon back into the atmosphere that was once part of living tissues. This ancient carbon is depleted in one of that element’s three naturally occurring varieties, or isotopes. The more fossil fuels we burn, the more the balance of these carbon isotopes shifts. ...These shifts should be apparent to any future scientist who chemically analyzes exposed layers of rock from our era. Along with these spikes, this Anthropocene layer might also hold brief peaks in nitrogen, plastic nanoparticles, and even synthetic steroids.

#### Are there any prior eras that fit this description?

> Fifty-six million years ago, Earth passed through the Paleocene-Eocene Thermal Maximum (PETM). During the PETM, the planet’s average temperature climbed as high as 15 degrees Fahrenheit above what we experience today. ...Looking at the isotopic record from the PETM, scientists see both carbon and oxygen isotope ratios spiking in exactly the way we expect to see in the Anthropocene (relating to or denoting the current geological age, viewed as the period during which human activity has been the dominant influence on climate and the environment) record.There are also other events like the PETM in the Earth’s history that show traces like our hypothetical Anthropocene signal. These include an event a few million years after the PETM dubbed the Eocene Layers of Mysterious Origin, and massive events in the Cretaceous that left the ocean without oxygen for many millennia (or even longer).

#### But does this indicate humans caused this to happen?

> Almost certainly not. While there is evidence that the PETM may have been driven by a massive release of buried fossil carbon into the air, it’s the timescale of these changes that matter. The PETM’s isotope spikes rise and fall over a few hundred thousand years. But what makes the Anthropocene so remarkable in terms of Earth’s history is the speed at which we’re dumping fossil carbon into the atmosphere. There have been geological periods where Earth’s CO2 has been as high or higher than today, but never before in the planet’s multibillion-year history has so much buried carbon been dumped back into the atmosphere so quickly. So the isotopic spikes we do see in the geologic record may not be spiky enough to fit the Silurian hypothesis’s bill.

#### Conundrum

> If an earlier species’s industrial activity is short-lived, we might not be able to easily see it. So it might take both dedicated and novel detection methods to find evidence of a truly short-lived event in ancient sediments. In other words, if you’re not explicitly looking for it, you might not see it.

#### The astrobiological perspective

> Civilization building means harvesting energy from the planet to do work (i.e., the work of civilization building). Once the civilization reaches truly planetary scales, there has to be some feedback on the coupled planetary systems that gave it birth (air, water, rock). ...Once you realize, through climate change, the need to find lower-impact energy sources, the less impact you will leave. So the more sustainable your civilization becomes, the smaller the signal you’ll leave for future generations.

#### Fossil-fuel-driven cycles of civilization

> In addition, our work also opened up the speculative possibility that some planets might have fossil-fuel-driven cycles of civilization building and collapse. If a civilization uses fossil fuels, the climate change they trigger can lead to a large decrease in ocean oxygen levels. These low oxygen levels (called ocean anoxia) help trigger the conditions needed for making fossil fuels like oil and coal in the first place. In this way, a civilization and its demise might sow the seed for new civilizations in the future.
