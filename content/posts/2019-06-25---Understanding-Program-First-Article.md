---
title: Understanding Programming, first article
date: '2019-06-25'
template: 'post'
draft: false
slug: '/posts/understanding-program-first/'
category: 'Computer Science'
tags:
  - 'Computer Science'
  - 'C Languages'
  - 'Advanced Topics'
description: 'I began learning to program in the middle of 2017. I had no idea what it was. Applications and websites, their creation made no sense to me. Here is a chronological progression of my understanding explained with simplicity.'
---

## [Chips](https://www.extremetech.com/extreme/191996-zoom-into-a-computer-chip-watch-this-video-to-fully-appreciate-just-how-magical-modern-microchips-are) or [Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra#Computers)

![computer chip up close](https://cdn-images-1.medium.com/max/1440/0*O_-08twsaNsYE6DO)

I remember when programming first started to make sense. My teacher was speaking of the underlying hardware of a computer. Chips caught my attention as an elementary idea of what is going on. Chips contain billions of switches. The switches have two variations, on or off. Computer programs tell a computer to do a certain task. They configure the switches to have a certain combination of on’s and off’s which through mathematical laws create an effect. The mathematical concept is Boolean Algebra, true(on) and false(off) or 0 and 1. These 0’s and 1’s are all that a computer understands, computers speak their own machine language. This language is Boolean Algebra.

But, while looking at the syntax of a programming language I did not see Boolean Algebra. I saw a wide variety of numbers, words, and symbols. How do they fit into the equation?

## [Syntax](https://en.wikipedia.org/wiki/Syntax) or [Symbolic Logic](https://en.wikipedia.org/wiki/Syntax)

![An expression of syntax, many symbols in what appears to be japanese tea cases](https://cdn-images-1.medium.com/max/1440/0*XdfBIXNNriBdIJ9X)

One of the first things I did to understand syntax was to express fundamental syntax concepts in several languages. In this way I could better understand how these languages interact with the computer.

I did something like this:

5 ideas here.

1. How to log to a console
2. if statement
3. What a null value is in the language
4. for loop
5. How to comment

```python
# Python
for i in range(6):
  # i becomes 0, 1, 2, 3, 4, 5 chronologically
  if None:
    print("This will never run")
```

```ruby
# Ruby
for i in 0..5 do
  # 0, 1, 2, 3, 4, 5
  if nil
    puts 'This will never run'
  end
end
```

```javascript
// JavaScript
for (let i = 0; i < 6; i++) {
  // 0, 1, 2, 3, 4, 5
  if (null) {
    console.log('This will never run');
  }
}
```

It was comforting to see how similar programming languages were. And, to notice that languages focus on using human readable statements.

But again, I needed to understand how it related to the computer… to Boolean Algebra. I noticed that in each language there are truthy and falsy values.

To understand truthy/falsy, all you have to know is that falsy signifies an off value (0) and every other value signifies an on value (1).

Below is an example in several languages:

```python
# Python
False, None, {}, [], '', 0, etc.
```

```javascript
// Javascript
false, null, 0, '', undefined, NaN; //, etc.
```

```ruby
# ruby
false, nil
```

This brought be back to Boolean Algebra. A combination of boolean values is at the core of what programming is. I had to then delve into the process of how computers think about syntax. We can see the Symbolic Logic in the code of programming languages, but how do computers?

## [Semantics](https://en.wikipedia.org/wiki/Semantics_%28computer_science%29) or [Syntactic Analysis](https://en.wikipedia.org/wiki/Parsing)

![computer screen with a lot of condensed javascript code](https://cdn-images-1.medium.com/max/1440/0*7KdGuNujPXFvUv_8)

The first step in understanding was the topic of Semantics. Semantics in Computer Science is the field of extracting meaning from syntax. With a combination of knowledge of the programming language, it’s semantics, and the computer’s hardware one can create a program to analyse the code. This program parses the code or does Syntactic Analysis.

This tells me that meaning can be extracted from programming languages but what actually happens?

The first thing I did was look for the code behind programming languages. Most programming language’s source code exists somewhere on the web. You can read it.

[Python's source code](https://github.com/python/cpython)

[Ruby's](https://github.com/ruby/ruby)

JavaScript is more confusing. This will be addressed later.

The images below come from the Github pages for the source code of Python and Ruby. These percentages signify the percentage of code written in different programming languages. Notice that they are both written with ~30% of C code.

![Shows the type of programming languages used to write Python](https://cdn-images-1.medium.com/max/1440/1*Hpb17UA__rc0oiMiAkmK0w.png)

<div style="text-align: center"><small>Notice C</small></div>

![Shows the type of programming languages used to write Ruby](https://cdn-images-1.medium.com/max/1440/1*V6fK9ai9bo8emLYYlw5Rww.png)

<div style="text-align: center"><small>C again</small></div>

What does this mean? What’s with C?

## [Machine Code](https://en.wikipedia.org/wiki/Machine_code) or [C](https://en.wikipedia.org/wiki/C_%28programming_language%29)-like languages

![Man in black clothe and a hood leaning on a pillar in a parking garage with the letter C shown prominently](https://cdn-images-1.medium.com/max/1440/0*RQ3-EPsaNXATrtcp)

According to Wikipedia, “By design, C provides constructs that map efficiently to typical machine instructions…”. That is to say that C code can “efficiently” convert to Machine Code. In other words, there are less steps from the code you write to the computer hardware. The conclusion is that most languages use a C-like language to translate the language into something the computer understands.

This was a definite aha! moment. Now, there are still a lot of questions. What makes C the way it is? Why do the other languages need to be translated by C? Is C some form of all godly language or are there similar languages?

There are many more questions. I’ll leave answers to these questions for a future article or for you to learn yourself.

But, I would like to go back to JavaScript. I have not shown the source code for JavaScript for a reason:

## [Client-Side JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs) or the [Front-end](https://en.wikipedia.org/wiki/Front-end_web_development)

![A cactus as a book weight with two famous Web development books shown in a minimal setting](https://cdn-images-1.medium.com/max/1440/0*peFIymcxDeo7lj2J)

JavaScript is the dominant language of the web.

But what does this mean?

First of all, JavaScript is the only language that runs straight in your web browser. You can even see this yourself by playing with the [developer tools](https://developers.google.com/web/tools/chrome-devtools/).

But still, what does it mean?

Over time companies such as Google, Mozilla, Apple, etc. decided it was best for developers to be able to write one set of code that can work in all browsers (Chrome, Firefox, Safari, etc.). At the same time, [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium)(The World Wide Web Consortium) which is the main international standards organization for the World Wide Web made it the standard programming language of the web.

Any language could have been, JavaScript was the chosen one.

JavaScript does not have a single repository like Python or Ruby (though it does have a [specification](https://www.ecma-international.org/publications/standards/Ecma-262.htm)). So, while the syntax of JavaScript is (mainly) the same in all browsers, each major browser has written their own version of JavaScript. Called engines.

You can read the code for these engines.

Google (and Opera as well as many other browsers) has the [V8 Engine](https://github.com/v8/v8).

Mozilla (Firefox) has [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Getting_SpiderMonkey_source_code).

Apple (Safari) has [WebKit](https://webkit.org/).

JavaScript, running in the browser is Client-Side JavaScript. It is also called Front-end code. This means that this code runs on the server of the user. Think of all those images, videos, blocks of text, fancy animations, etc. that are on webpages. They come from another server out there in the world and then to your server. Then, the browsers internal code reads this data and shows it to you. You are the client, the code is on your side (corner… server) of the universe. You can imagine that a big block of code gets sent to you and then your computer’s resources run this code.

But what about other programming languages? What about code outside of the browser (applications native to our phones, computer, and everything else that is not the internet)?

## [Server-Side Code](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction) or the [Back-end](https://en.wikipedia.org/wiki/Front_and_back_ends#Back-end_focused)

![A very clean, futuristic looking setting used to convey an idea of what server farms look like](https://cdn-images-1.medium.com/max/1440/0*7lEfEKizUP2s_qtp)

While code read by the browser is defined as Client-Side JavaScript, code read outside of that environment is defined as Server-Side Code.

What this means is that the code written is not read by the clients server but by a server in which the code resides. What is going on here is more complicated then Client-Side Code. First, I will focus on defining Server-Side Code in relation to what we call the Back-end.

The purpose of the Back-end stems from questions of security. The browser is quite secure. There are many nuances but it is rare for your computer to get infected by visiting a site. You would need to download something or the like for that to happen. The reason for this is that Front-end code does not have access to such things as the computer’s operating or file system. Front-end code runs in the browser environment, a wall that blocks malicious code.

As for the Back-end, it has access to the operating and the file system. But, it uses the resources of the code owner’s server rather than the user’s (or your’s). It does not have access to the client’s server. Its use case is usually to store data related to a website. Think user content such as login information, posts, and messages. It will slow down the Front-end if all this info is immediately sent to the user. So, the data lives in the file system of the Back-end server and a part of the data get’s sent when needed.

Back-end Code can be written in any language.

For JavaScript you have [Node.js](https://github.com/nodejs/node) among other options such as [Deno](https://github.com/denoland/deno).

Python and Ruby are Server-Side languages.

But, I mentioned earlier that I was only mentioning a part of the picture of Server-Side Coding. The next step is…

## [Platform Dependent](https://en.wikipedia.org/wiki/Computing_platform) or [Native Code](https://www.techopedia.com/definition/3846/native-code)

![A bunch of apple products in a very minimal setting, extremely white and clean looking](https://cdn-images-1.medium.com/max/1440/0*Q8zxWeLZeyH5fFnn)

Platform Dependent means that computer hardware is built with certain computer languages in mind. Or, the computer’s hardware has programs that can read code from certain programming languages better than others. Sometimes, it is required to use certain languages. Though, some projects you can abstract away the need to write code in these languages.

Examples of platforms that expect you to use certain languages are:

Apple (Mac and iPhone) expects the use of [Swift](https://swift.org/) or [Objective-C](https://en.wikipedia.org/wiki/Objective-C).

Android… Google states that “Android apps can be written using [Kotlin](https://en.wikipedia.org/wiki/Kotlin_%28programming_language%29), [Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29), and [C++](https://en.wikipedia.org/wiki/C%2B%2B) languages” (taken from Wikipedia). But, the main language used is [Java](https://go.java/index.html?intcmp=gojava-banner-java-com).

For Windows, it appears all over the place but most of what’s built for Windows uses the [.NET](https://en.wikipedia.org/wiki/.NET_Framework) framework which uses [C#](https://en.wikipedia.org/wiki/C_Sharp_%28programming_language%29).

As I mentioned, there are several projects that allow you to use other languages. Here are a few JavaScript examples.

For iPhone and Android you can use [React Native](https://facebook.github.io/react-native/). This allows you to create iPhone and Android app’s with one set of code.

For desktop applications there is [Electron](https://electronjs.org/) which supports Mac, Windows, and Linux.

The way projects like React Native and Electron work is that they do something like what I mentioned earlier. The idea of another language like C making your code machine readable.

![Displays what programming languages were used to write react native, javascript = 50%, java = 20%, objective-c = 12%, C++ = 15%, etc.](https://cdn-images-1.medium.com/max/1440/1*pV_zP-v9T50oHrIctDIY1Q.png)

<div style="text-align: center"><small>Notice java and objective-c</small></div>

Above is the Github repo for React Native. Notice that Java is 20% of the code base and Objective-C is 12%. Not to mention there is a bunch of other C code written. So, with React Native you can make an app while only writing JavaScript because the other code makes your code readable to the platform. There is a process that reads your code and converts it to the native equivalent for both Android and iOS. So, it is like having three different code bases at once. Except you only write the JavaScript code.

<hr />

Above, was a long process of understanding. I know that there are some statements that are not completely correct but what I aimed for was a high level overview. Each one of these topics can have an entire article written about it!

Thanks for reading!
