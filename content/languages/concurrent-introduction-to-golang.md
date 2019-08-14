---
title: A Concurrent Adventure Introducing Golang
template: 'post'
image: "https://image.slidesharecdn.com/periodictableofprogramminglanguages-1343129034744-phpapp01-120724062732-phpapp01/95/periodic-table-of-programming-languages-1-728.jpg?cb=1343111268"
alt: 'programming languages logo'
draft: false
slug: '/languages/concurrent-introduction-to-golang'
category: 'Languages'
tags:
  - 'Golang'
  - 'Real article'
description: 'A fun introduction to Go for Javascript Developers or people of a similar vein, as in predominantly dynamically typed language experience. There are many links within, as they were links that were integral in my understanding the language.'
---

<span style="initial-letter: 2">A</span> fun introduction to Go for Javascript Developers or people of a similar vein, as in predominantly dynamically typed language experience. There are many links within, as they were links that were integral in my understanding the language.

![this is a silly gopher](https://cdn-images-1.medium.com/max/1600/1*Uc-Ey0te8v80aV15zR_Jhg.png)

<div style="text-align: center"><small>Gopher-”hello human”</small></div>

You’re curious. You’ve heard of this mystical language that is steadily climbing the [rankings of the Software Industry](https://www.businessinsider.com/the-9-most-popular-programming-languages-according-to-the-facebook-for-programmers-2017-10/#15-objective-c-1). You know the elusive dragon of Google created it. Perhaps you heard that the creator of Node JS writes in it. But more then anything, you’ve noticed the gopher.

There is one concept you must understand to properly conceptualise Go. That is… concurrency!

But why does concurrency matter? [There is no way around it](https://softwareengineering.stackexchange.com/questions/115474/why-should-i-know-concurrent-programming). If there was solely synchronicity, our computers would be moving at a snail’s pace.

And Go is quickly becoming the leader of concurrent programming. This is because it is beautifully written and it performs extremely well. In a way, it is the best of both worlds.

![a chart showing that go has a high degree of beautiful, straight code and efficient concurrency compared to other programming languages](https://cdn-images-1.medium.com/max/1600/1*Z5o7RHMaYZc_bqMFkOvhIA.png)

<div style="text-align: center"><small>Check <a href="https://www.cuelogic.com/blog/go-programming-and-why-should-you-learn-go/">this link</a> out for further explanation</small></div>

Let’s learn by imagining. You are in a parallel universe. The setting of life is a maze. You can create copies of yourself and send these other selves in different directions. The meaning of life is finding a way through this maze.

![a big confusing maze](https://cdn-images-1.medium.com/max/1200/1*8MX9FaK9fmryg6ylB-3alw.png)

<div style="text-align: center"><small>A million you’s finding (their? your?) way through life.</small></div>

You send your clones in every direction that is possible. When one finds the exit all the clones disappear and you become the clone that found the way. And you find the meaning of life.

<hr />

First, an example in JavaScript:

JavaScript event looping to find the exit… yes, this is an oversimplification.

```javascript
findExit(clone, maze) {
    //go to a random location that is not where the clone is
    if( maze.location.next.length === 3 ) {
         let currentLocation = clone.direction( maze.location.next[
             Math.floor(Math.random()*3)]
                                              ) )
    } //...more if's, etc.
    if( currentLocation === maze.location.final ) {
        return theMeaningOfLife
    }
}

const clones = [/*so many clones*/], maze = createMaze()
clones.forEach( ( clone, i ) => {
    if(i % 2 === 0) life.setTimeout( findExit( clone, maze ), 1)
    else findExit( clone, maze )
})

```

<div style="text-align: center"><small>Pseudo Code JS implementation</small></div>

<hr />

And now…. Go!

Look through it quick, there is a detailed explanation directly after.

```go
type TheMeaningOfLife {
    sustenance //this is not matched with anything, it is simply for meaning
}

type LocationProps struct {
    next []string
    final string
}

type Location struct {
    props LocationProps
}

type Maze struct {
    Location
    Directions [][]int
    Height     int
    Width      int
}

type Clone struct {
    cloneNumber int
}

type CloneAction interface {
    goDifLocation(location string)
    findExit(m Maze)
}

func (*c Clone) goDifLocation(l string) {
    //This is a pointer, so it mutates what it is called on
    //This does? Make clone go to the next location, return nothing
}

func (c Clone) findExit(m Maze) TheMeaningOfLife {
    var currentLocation string
    if len(m.Location.props.next) == 3 {
        currentLocation = &c.goDifLocation(
            m.Location.props.next[rand.Intn(
                len(m.Location.props.next))])
    }
    //... etc.
    if currentLocation == m.location.props.final {
        return TheMeaningOfLife
    }
}

func createMaze(height int, width int) Maze {
    //create the maze
}

func main() {
    mazeData := createMaze(1000, 10000)
    maze := Maze{mazeData}
    clones := make([]Clone, 1000000)
    for i := range clones {
        clones[i] = Clone{id: i}
        go clones[i].findExit(maze)
    }
}

```

<div style="text-align: center;"><small>Don’t be intimidated.</small></div>

Ok, quite a bit to explain.

Let’s start small ;)

```go
type LocationProps struct {
    next []string
    final string
}
```

<div style="text-align: center;"><small>struct ~= JS constructor but with only properties, no methods</small></div>

Struct? This is similar to creating a constructor in JS and associating two properties. But you must specify the type of your properties and you [cannot give a default value](https://stackoverflow.com/questions/19612449/default-value-in-gos-method).

On to a nested struct:

```go
type Location struct {
    props LocationProps
}
type Maze struct {
    Location
    Directions [][]int
    Height int
    Width int
}
```

<div style="text-align: center;"><small>Notice how structs are being passed into structs ~= nesting objects</small></div>

Now! Nested structs. So I can do this… `maze.Location.props.final`.

And what is this? `[][]` . It means this: `[[],[]]`. This is the type, two arrays inside of an array, extremely complex.

Onto interfaces:

```go
type CloneAction interface {
    goDifLocation(location string)
    findExit(m Maze)
}
```

<div style="text-align: center;"><small>interfaces ~= floating method constructors</small></div>

Now what? Think of these as… floating method constructors! In Go they are called interfaces! Once you associate them with a struct, the struct can call them. Prior to that, nothing can call them.

Though, there is another step, the function must associate with the struct:

```go
func (*c Clone) goDifLocation(l string) {
  /*c.goDifLocation can now occur in different functions*/
}
```

<div style="text-align: center;"><small>First parentheses is the struct associated</small></div>

As the comments say. Methods associated with a specific struct is classified in this way.

But now there are functions, and what is with the \*? Surely you’ve heard of a pointer but what does this mean in terms of Go? If you write this elsewhere: `&c.goDifLocation(...)` the variable of type Clone, c in this case, is… mutated! Sound familiar? If you want to read more about mutations: [There is no pass-by-reference in Go](https://dave.cheney.net/2017/04/29/there-is-no-pass-by-reference-in-go).

Back to the function! The parameter: `(l string)`. Yes, it must also be given a specific type. Also, it is common to give short names in Go for parameter names, hence the l for location.

Next, a more detailed function:

```go
func (c Clone) findExit(m Maze) TheMeaningOfLife {/*...*/}
```

<div style="text-align: center;"><small>Adding function to struct, specific parameter, specific return value</small></div>

1, 2, 3, 4 things? Well, yes, that is the reality.

`(c clone)` - Ex. somethingOfTypeClone.findExit…

`findExit` — This is the name of the function

`(m Maze)` - Ex. somethingOfTypeClone.findExit(somethingOfTypeMaze)

Lastly, the return value! `TheMeaningOfLife`

The function as a whole:

```go
func (c Clone) findExit(m Maze) TheMeaningOfLife {
    var currentLocation string
    if len(m.location.props.next) == 3 {
        currentLocation = &c.goDifLocation(
            m.Location.props.next[rand.Intn(
                len(m.location.props.next))])
    }
    //... etc.
    if currentLocation == m.location.props.final {
        return TheMeaningOfLife
    }
}
```

<div style="text-align: center"><small>The meaning of life</small></div>

Now the function. Check out the first line: `var currentLocation string`. Again, always remember: type is necessary.

Notice how I initialised currentLocation out of the if statement? Sound familiar? [Lexical scope!](https://kuree.gitbooks.io/the-go-programming-language-report/content/24/text.html) That link has a nice gist to explain if you do not know.

And the if statement? No parentheses allowed! Wonderful, no? Solely double equals. Again, much nicer than JS. But know this, the curly braces are required. If you throw in an else statement? A short explanation: [Go by Example: If/Else](https://gobyexample.com/if-else). Basically, what should be known is that the else or else if must be on the same line of the ending bracket — } `else {...`

And the convoluted grabbing of a particular index. Let me simply say, a number between 1 and 3 is found. rand is a library, as is math that must be imported at the beginning of the file. A link if you are curious: [Packages](https://www.golang-book.com/books/intro/11). Though grabbing random numbers [is a bit complicated in Go](https://gobyexample.com/random-numbers).

Onto the main function:

```go
func main() {
    mazeData := createMaze(1000, 10000)
    maze := Maze{mazeData}
    clones := make([]Clone, 1000000)
    for i := range clones {
        clones[i] = Clone{id: i}
        go clones[i].findExit(maze)
    }
}
```

<div style="text-align: center"><small>main is the main man in town</small></div>

Main is what is all that is executed when you the file, as in, all that is in this function will be what is outputted or returned.

What’s := about? [Implicit type](https://tour.golang.org/basics/10). And yes, functions return values in similar way’s as in JS. `Maze{ mazeData }` is creating the struct with the `mazeData` as the values associated to it.

Assume that `mazeData` looks like this:

```go
{
  Location: {
    next:["a1","a2","a3"],//or the like
    final:"z99"
  }
  Directions: [[/*giant*/][/*array*/]],
  Height: 1000,
  Width: 10000
}
```

Each value needed for the structs are filled out. Or a [zero value](https://tour.golang.org/basics/12) is given if they are not.

As for: `make([]Clone, 1000000)`. This is called a [slice](https://tour.golang.org/moretypes/13). An array is created filled with 1000000 types of this struct, but all of them are empty!

```go
for i := range clones {
    clones[i] = Clone{id: i}
    go clones[i].findExit(maze)
}
```

<div style="text-align: center"><small>Concurrency!</small></div>

The last bit of code. The for `:= range` is similar to a forEach of the clones array. Though, the first argument is always the index, the second can be the actual instance. I am setting the id of each clone and…

Go Routines!!!!!

You type this and every single clone goes into it’s own process to find it’s way through the maze. All going different directions BUT heading to the same goal! Concurrency in a nutshell.

![busy golang gophers moving stuff around concurrently](https://cdn-images-1.medium.com/max/1600/1*sGMKM87adOCwpHagRmqEIA.jpeg)

<div style="text-align: center"><small>Busy gophers</small></div>

Like the gophers above, all doing the same thing, a quite horrid thing… book burning. But still! Each is a singular entity aiming for the same goal.

Now, that is an intro to the Go language. Hope you enjoyed the journey. If you are looking for some more info to dive into:

<ul>
  <li><a href="https://gobyexample.com/">Go By Example</a></li>
  <li><a href="https://tour.golang.org/welcome/1">A Tour of Go</a></li>
  <li><a href="https://github.com/cdarwin/go-koans">Go Koans</a></li>
  <li>Definitely <a href="https://www.youtube.com/watch?v=ytEkHepK08c&t=2s">this video!</a> And <a href="https://www.youtube.com/watch?v=f6kdp27TYZs">this one</a> by the mastermind of Go!</li>
</ul>

Thanks for reading
