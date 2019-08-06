---
title: Background Tasks API and last night's dream
date: '2019-07-29'
template: 'post'
draft: false
slug: '/posts/7-29-19/'
category: 'Background Tasks API'
tags:
  - 'Background Tasks API'
  - 'Dreams'
  - 'Project'
description: 'This is a repost of what I just wrote for the website i am working on that looks at obscure parts of web development. This is about the Background Tasks API. I also had a strange dream last night. So i wrote a bit about that.'
---

## Background Tasks API

### [Can I use?](https://caniuse.com/#search=requestidlecallback)

Yes! You can use it in most browsers.

### Why is it useful?

The browser knows exactly how much time is available at the end of the frame, and if the user is interacting, and so through `requestIdleCallback` we gain an API that allows us to make use of any spare time in the most efficient way possible. This is great for nuanced performance optimisations where you want to ensure a low frame rate by scheduling JS tasks when the user is not interacting with the DOM.

### How this website uses it

You have two buttons here. `Start Background Tasks` and `Take Over the Event Loop`. Let's talk about what happens with both.

#### Start Background Tasks

`startBackgroundTasks`

<iframe frameborder=0 scrolling="no" seamless="seamless" srcdoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://gist.github.com/jMuzsik/62430898767ccf760220f8ed8852be56.js"></script></body></html>'></iframe>

- Does what the title states first. Then, it creates a few hundred tasks. Each task has two properties, count and text (more on these later). Then, the tasks are added to the task queue.

`enqueueTask`

<iframe frameborder=0 scrolling="no" seamless="seamless" srcdoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://gist.github.com/jMuzsik/864e20b0f22cde27bd463edc188505c1.js"></script></body></html>'></iframe>

- Here, after adding the tasks to the queue, we then begin the calling of Background Tasks.

`runTaskQueue`

<iframe frameborder=0 scrolling="no" seamless="seamless" srcdoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://gist.github.com/jMuzsik/d689cd518cd5633f00b6fa28c7f3862a.js"></script></body></html>'></iframe>

- Now a little more interesting! Here, there is the `timeRemaining` property which is how much time the browser gives you to finish whatever JS you're trying to get through. Notice the `console.info` calls. Each time the `while` loop goes through several tasks prior to breaking out. What happens inside the while loop is a bit separate from Background Tasks but I will explain in the following section.
- After the while loop, the browser just wants to break out of `requestIdleCallback` as the timeout has occurred! So, it first checks if there are any tasks left and if there are, it calls `requestIdleCallback` again to continue the process.

And the rest of the functions:

<iframe frameborder=0 scrolling="no" seamless="seamless" srcdoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://gist.github.com/jMuzsik/f912a76cbf04bdb137bc7f1295ae5e0e.js"></script></body></html>'></iframe>

- Here is the DOM work. First, the `while` loop called `task.handler(task.data);` which called `logTaskHandler`. Which is basically a wrapper around `log`, which creates a `documentFragment` which is basically a way to create a collection of DOM nodes that are not (yet) connected to the main DOM tree. [Read more here](https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment).
- After the fragment is completed, it's time to add it to the DOM. Which is what `scheduleStatusRefresh` is for. It calls `requestAnimationFrame` with the function `updateDisplay`. The reason to use `requestAnimationFrame` is because our eyes notice sensory data that takes more than 15ms. So, if something on a webpage takes more than 15ms to finish, we will notice it. If it's way longer, that's when we get awkward movements on the webpage, which the experts call jank. So, developers should aim for around 900ms (100ms are often lost for a variety of reasons) / 15ms =~ 60 frames per second. Well, notice the word frame just got used. That's all `requestAnimationFrame` is. It waits until whatever frame is occurring at the moment. The page could be at 100 frames per second. Or 10 frames per second. All you need to know that when `requestAnimationFrame` is called it waits until whatever frame is running ends, then it calls the code within it's callback function.
- So, it is used here to do the DOM updates in a more patient, performant way than calling each block of JS immediately. `updateDisplay` does a little more stuff but the rest is not all that vital to understand.

And here is the rest of the code. It uses `lit-element` which I will likely explain more about in the future:

- FYI if you look at the code below. You'll notice that `requestIdleCallback` is either the `window` version (if it is supported) or a backup version (for unsupported browsers). It's just a timeout, and may not work... haven't tested it.

<iframe frameborder=0 scrolling="no" seamless="seamless" srcdoc='<html><body><style type="text/css">.gist .gist-data { height: 400px; }</style><script src="https://gist.github.com/jMuzsik/535e60966e77e1325ed62e6d3b0b7ca9.js"></script></body></html>'></iframe>

## Dream

### What I wrote when I awoke

Creation of experiences, emotional states, directly from memory.

- images, words can be conjured
- infer situations
- you can view yourself dreaming

I dreamt that I was awake, trying to write this but a white ghostlike element was crying towards me, awaking me.

Before awakening I heard what sounded like the beginning of a song. A very high pitched, but rhythmic song. I heard the sound of my name, J, the j sound. Like a tune, ...

- Can't read the rest.

### What I remember now

I do not remember what preluded the dream. I know that I was only sleeping for around 30 minutes. I know my mind was racing and the dream was vivid. But what I remember is the waking dream. The time when you see yourself dreaming. Which is defined as lucid dreaming. But, my eyes were open while I was dreaming. I was looking out into the room. But, the sounds of dreams were still filling my mind. I heard voices and that sound when things are rushing towards you. And, I directed my mind to thoughts of premonition. I remember continually thinking that someone would walk into the room. Like something was gonna happen. I conjured what appeared to be a ghost and it flew at me. It sang towards me. What appeared to be the j sound, high pitched as mentioned earlier. I remember that while dreaming I had this idea, and I felt a need to write, as mentioned above.

### But what is this idea?

It was simple. It was me telling myself that a dreamlike state could be created. I was thinking that it was easy, it appears. The memory creates experiences and emotional states. But, I must have had a deeper thought then that. Perhaps not. I believe the real thought was before the lucid dreaming. As I had a sudden desire to awake. There was an excitement. This world of thought must be thanks to `Let the Great World Spin`.