---
title: A Space Themed Intro to Golang
template: 'post'
draft: false
slug: '/languages/space-intro-to-golang'
category: 'Languages'
tags:
  - 'Golang'
  - 'Real article'
description: 'A short article about Golang aimed for newer developers or those who have not spent much time researching the language and would like a short, concise, well thought-out, and original introduction. All code written is within a repl.'
---

Go is real cool, something that is extra cool about it is that it is the highest paying technology according to Stack Overflows 2017 dataset. The average pay for a Go developer is ~ 110k a year: [this link right here!](https://insights.stackoverflow.com/survey/2017)

(Technology -> Top Paying Technologies on sidebar for verification)

![Goher surrounding by a lot of money with fake hands making it look like the gopher is holding money](https://cdn-images-1.medium.com/max/2400/1*E7Jb0bgW3wwTRqPo9adQ-Q.jpeg)

<div style="text-align: center"><small>Hot damn!</small></div>

But, that is only a piece of the reason to learn Go. The main reason is this: `learning it is only going to speed up your understanding of fundamental computer science topics`. Why? Well, Golang is a well thought out modern language that utilises many of the best practices of programming languages created before it.

It is also a language that was made by Google to take care of the massive amount of data and problems associated with handling their search engine that almost everybody uses.

On another note, to fully learn Go is to learn how to build software that provides answers for low level problems. Another way to say it is software that provides services for other software. `In a way, if you know Golang then you know how to build programs that touch the root of this field.`

Let’s delve into some code. The story begins as so:

<blockquote>
It is now, this time, as in, 2018. But suddenly time jumps… 240 years ahead. As if you were Austin Powers frozen all this time. And it is up to you to suddenly save the universe. With a twist at the end.
</blockquote>

I wrote a piece of code, around 150 lines, that tells the very short story in its entirety (lots of prints) which I will put at the end. I am going to go through the code from start to finish prior. Starts simple, then gets a bit dense.

```go
package main
import (
 "fmt"
 "time"
 "strconv"
 "io"
 "strings"
)
```

**`package main`**? All Go source code is part of a package, and each file necessitates a package statement. package main is the file where the code runs. Other package files are modules imported into `package main`. The modules are reusable pieces of code to use or implement within `package main`.

So, the imported modules contain source code which I will use within this file.

```go
type Aliens struct {
  species int
}
type NotEarthling struct {
  total int
  century string
  thingamajig string
}
type Earthling struct {
  total int
  century string
  name string
  age int64
}
type WordSpaceship struct {
  health string
  weapon string
}
type NumberSpaceship struct {
  health int
  weapon int
}
```

Multiple structs with different usages.

**What’s a struct**? It is how you create an object that can have different types for each value. The key is the word written, a string. Though, each key must have the specified type, it is not dynamic.

The other major way to create objects is with a **map**. Though, in that case every key must be a single type as well as the values:

- **`make(map[string]int)`** all keys must be string, all values must be int

So, in maps each key must be of one type and each value must be of one type. In structs, different types are allowed for each value.

```js
var you = Earthling{century: "21st", name: "you", age: 24}
func main() {
    defer fmt.Println("Is this all a dream?")
    now := time.Now()
    nanos := now.UnixNano()
    fmt.Printf("Right now it is: %v! \nPop! AHHHHH\n\n", now)
```

The **variable declaration** occurs in the global scope, so it must be initialised with the var keyword. This is one way to initialise structs. Notice that I specified the key and set it’s value to the corresponding type written in the struct definition. Notice how I have not initialised every key/value (you not need to).

**`defer`>?** This creates a last-in-first-out stack of function invocations to be called after the completion of func main() {...} . I say a stack as defer can be called multiple times and each time it is called the last function pushed onto the stack is called first.

**`:=`, what is this?** This is to say that the type will be figured out dynamically by the compiler. As in, when initialising a value to a variable in this way you do not need to specify the type, the only way to do so.

**`time.Now()`** returns this: `2017–12–28 01:41:05.240081928 +0000 UTC`

**`now.UnixNano()`** returns this: 1514425756675856179 which is the amount of nanoseconds that have occurred since the creation of Golang 8 years ago.

`Printf` allows logging out values in varying forms. These are the two main forms:

- `%v` gives the default value
- `%T` gives the type of the value

Still in the function main below.

```go
nanos = nanos + 7600000000000000000

years := (nanos - now.UnixNano())/1000000000/31622400

now = time.Unix(0, nanos)
fmt.Printf("And now it is: %v!\nOh hell!\n\n", now)
```

At the beginning one goes 7600000000000000000 nanoseconds into the future which is ~ 240 years.

**`years`** is a calculation, convert to seconds then to years.

**`time.Unix(seconds, nano seconds)`** will convert the nanoseconds to: 2258–10–29 00:55:56.675856179 +0000 UTC

```go
var e []Earthling
var ne []NotEarthling
for i := 0; i < 70000; i++ {
    e = append(e, Earthling{})
}

for i := 0; i < 44; i++ {
    ne = append(ne, NotEarthling{})
}

aliens := Aliens{2}
futureEarthling := Earthling{len(e), "22nd", "The Future", 32141}

futureNotEarthling := NotEarthling{len(ne), "99th", "Grok grok grok"}
```

The `var` keyword calls set a _zero valued_ array (empty array) that can only be filled with the specified type. One cannot add ints, strings, etc. to this array.

In the following **for loops**, I am _appending empty structs of the specified type_ to the arrays.

There are only two alien species in this case. `Earthlings` and `NotEarthlings`.

Notice, how `futureEarthling` is set to the struct `Earthlings` without specifying the key, this is a shorthand, as long as you place the values in the corresponding order defined in the struct, in this case: `{int, string, string, int64}`, then the fields can be filled out in this way.

Now there is a function called `Greet` attached to each `Earthling` object… lets check out that separate, not in main, function.

```go
func (e *Earthling) Greet(y int64) string {
    century, _ := strconv.ParseInt(e.century[0:2], 0, 64)
    if century > 21 && century < 30 {
      age := strconv.FormatInt(you.age, 10)
      str := "Welcome to the future young Padawan, you are in the: " + e.century + " century. And I am: " + e.name + ". You are now... " + age + "years old. The world is under attack, and you have been revived to defend it! Big scary invader has something to say..."
      return str
    } else {
      e.age = e.age + y
      return "Where am I???"
    }
}
```

Ok, so this corresponds to the existential crisis this person is going through, waking up so far into the future, and some random future guy that has something to say!

Hmm… look at the top: `(e *Earthling)`. What’s this? Well, `e` is going to be the instance of the `Earthling` object the method is called on. And the _? This is a pointer. I invite you to open the repl at the bottom of this post, delete that _ and see what happens.

What it means is this: `you.Greet(year)` _is creating a copy of you unless you point at it’s memory address._ If you do not, anything you do on you will not alter the object within the main function. The pointer assures that the object can be altered.

We also have a new library in this code snippet… `strconv`. This is the library to use when you want to change an int to a string, vice versa, or many other types. Go has so many data types… int, int8, int16, int32, int64. And all I named is int there, in other words, one can go on and on… type galore.

If you look closely, the entire reason I used a pointer was to alter the age of the young Padawan.

```go
numberShip := NumberSpaceship{100, 3}
wordShip := WordSpaceship{"Read this to defeat me.", "Powerful words!"}

wordAttack := make(chan int)
finished := make(chan int)
go func() {
    for {
        numberShip.health = numberShip.health - <-wordAttack
        if numberShip.health <= 0 {
            Extinction(&aliens)
            finished <- 0
        }
    }
}()

fmt.Println(Fight(&numberShip, &wordShip, wordAttack, finished))
```

Ok, first of all, the first parameter of both structs is their health. So, for the `numberShip` the health is 100, and for the `wordShip` the health is a sentence… "Read this to defeat me" …? I’ll go into that in the function at the bottom, `Fight`, which uses what is called a `Reader`.

`make(chan int)` creates what is called a channel. A conduit to send/receive values. Sending is as so: `<-wordAttack`, and receiving as: `finished <- 0`.

`go func() {…}()` is the creation of a _goroutine_. When working with channels and goroutines in unison, the main thing to remember is that the goroutine continues _as long as the channel sends it values_. So, let’s go check out where it is getting it’s values, the `Fight` function.

```js
func Fight(ns *NumberSpaceship, ws *WordSpaceship, c, f chan int) string {
    x := len(ws.weapon)
    r := strings.NewReader(ws.health)
    b := make([]byte, ns.weapon)
    for {
        select {
            case c <- x:
                fmt.Println("Hit it!")
            case <-f:
                fmt.Println("He's finished!")
                return "\nYou saved time, space, eternity, everything!\n"
        }
        _, err := r.Read(b)
        if err == io.EOF {
            return "You failed, the universe is to end."
        }
    }
}
```

First, check out the function signature. The function was called by _referencing_ the variables memory address (with **&**). In the signature, the function expects a _pointer_ (ie. a _referenced_ variable) as the argument for both `NumberSpaceship` and `WordSpaceship`.

Also, check out how both **chan ints** type is only written once. Parameter types can be grouped if they are next to one another and the same exact type.

First, the **strings** library, this “implements simple functions to manipulate UTF-8 encoded strings.” In this function a _reader_ will be created to read a string.

Ok, the implementation of the string reader:

- **`r := strings.NewReader(ws.health)`** returns a new _Reader_ that will read from s: _"Read this to defeat me"_.
- **`b := make([]byte, ns.weapon)`** returns a byte slice of the length specified. `ws.weapon` is the value 3.
- **`_, err := r.Read(b)`** is more nuanced. `_` can also be a variable name, let’s call it `n`. If `n` exists it means that the amount of bytes read by `Read` is to be returned to `n`. But if left as is then one does not have to use the value returned. Otherwise, you have to, which is to say that _Go does not allow one to not use declared variables_. So, for one, `Read` returns the amount of bytes read, and secondly it returns an error if and only if the entire string was read, in which case an `io.EOF` (end of file) error is returned. Otherwise, it’s value is: `<nil>`.
- So, `r` is the reader. `b` is what the reading of the string is put into. `Read` is the function that is called to make that come about.

So, to summarise the `Reader`, and why it is being used, once the string is read the `NumberSpaceship` wins, and the `WordSpaceship` loses. Very intense battle.

- Quick side note: `for {…}` is to say, do an infinite loop until the function returns.

As for the attack of the `WordSpaceship`.

- **`select`** is waiting on multiple communication operations, both channels, `c` and `f`. When one is ready to send out its data or receive data, it will continue to do so as long as the function does not return.
- **`case <- x`** is to say, continually send the value of x to this channel. Then, going back to `func main`’s goroutine, do this: `numberShip.health = numberShip.health — <-wordAttack` to damage the ship. So, the channel is emptied of the x it just received. So, _channel receives a value and sends it out right after in the corresponding goroutine_.
- **`case <- f`** solely runs when f has a value associated to it and this only happens when this occurs in `main: finished <- 0`, after the if statement.

That’s the fight! And after the battle, whoever lost, well, their entire species goes extinct… this was how it was written, the logic is not combined in the real code as so though.

```go
type Aliens struct {
    species int
}
func Extinction(a *Aliens) {
    a.species = a.species - 1
}
func main() {
    aliens := Aliens{2}
    Extinction(&aliens)
}
```

Quite an intense bit of logic.

And the entirety of what is logged out from the real code!

```
Right now it is: 2017-12-28 21:40:35.066259304 +0000 UTC!
Pop! AHHHHH

And now it is: 2258-10-29 20:47:15.066259304 +0000 UTC!
Oh hell!

Where am I???

Welcome to the future young Padawan, you are in the: 22nd century. And I am: The Future. You are now... 264 years old. The Universe is under attack, and you have been revived to defend it! Big scary invader has something to say...

Tord thaz geck hild quemp 240!

He challenged you! You're the chosen one, so you must save the Universe! Jump on this spaceship.

VRRRROOOOOOOOOOOOMMMMMMMM BOOM BOP BOOM BOP

Hit it!
Hit it!
Hit it!
Hit it!
Hit it!
Hit it!
Hit it!
He's finished!

You saved time, space, eternity, everything!

AHHH, the aliens left a bomb, the Universe is to disintegrate into nothingness!

Some higher being sort of thing says: There are  0  sentient beings left alive.

Was that all a dream?
```

And the repl:

[Repl](https://repl.it/@jerrymuzsik/GolangArticleFrozenSpaceGuy)

I highly recommend this if you are interested in learning more Go, great introductory documentation/practice problems!

[Tour of Go](https://tour.golang.org/welcome/1)

<blockquote>Thanks very much for reading! Mr. Golang has a bit to say as well.</blockquote>

![Golang gopher with a top hat on, a suit, and a glass of champagne](https://cdn-images-1.medium.com/max/1600/1*PmggWfHAc6_fXW64llUBKw.jpeg)

<div style="text-align: center;"><small>I thanky thee muchee for readee thisee thingee, cheerees mee buddy</small></div>
