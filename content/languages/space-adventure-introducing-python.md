---
title: A Space Adventure Introducing Python
template: 'post'
draft: false
slug: '/languages/space-adventure-introducing-python/'
category: 'Languages'
tags:
  - 'Python'
description: 'This article is not targeting the absolute beginner. It is specifically for JS Developers or the like looking for a fun introduction to the incredibly popular programming language Python. Many concepts explained: multiple inheritance, list comprehensions, the basics, and peculiarities of the language. All code can instantly be copied/pasted into a repl, and there is a repl near the end of the article to look directly at.'
---

<span style="initial-letter: 2">T</span>his article is not targeting the absolute beginner. It is specifically for JS Developers or the like looking for a fun introduction to the incredibly popular programming language Python. Many concepts explained: multiple inheritance, list comprehensions, the basics, and peculiarities of the language. All code can instantly be copied/pasted into a repl, and there is a repl near the end of the article to look directly at.

### In a universe of 90328443435329598 alien beings. Two new beings came from the void…

![Block of code background with python logo in front](https://cdn-images-1.medium.com/max/1600/1*P9UGX6-8d6sOBpHDi2oe3Q.png)

<div style="text-align: center"><small>Python Alien</small></div>

<blockquote>

Hello human. Your name is Marcel or so I hear. And you are one of 7530305890 human beings.

I am a python and my name is Guido, one of 3 python beings.

Now, there are: 90328443435329600 alien beings.

</blockquote>

```python
total_aliens = 90328443435329598
total_humans = 7530305889
total_pythons = 2

print('In a universe of:', total_aliens, 'alien beings. Two new beings came from the void...')

class Alien(object):
    def __init__(self, type_of):
        self.being = type_of
        global total_aliens
        total_aliens = total_aliens + 1

class Human(Alien):
    def __init__(self, name):
        self.name = name
        super().__init__('human')
        global total_humans
        total_humans = total_humans + 1

    def go_back_to_earth(self):
        pass

class Python(Alien):
    def __init__(self, name):
        self.name = name
        super().__init__('python')
        global total_pythons
        total_pythons = total_pythons+1

marcel = Human('Marcel')

print('Hello', marcel.being, '. Your name is ', marcel.name, 'or so I hear. And you are one of', total_humans, 'human beings.')

guido = Python('Guido')

print('I am a', guido.being,'and my name is', guido.name,'one of', total_pythons, 'python beings.')

print('Now there are:', total_aliens, 'alien beings.')
```

<div style="text-align: center"><small>classes, multiple inheritance, __init__, def, self, global</small></div>

`total_aliens = 90328443435329598`. That is to say that Python is dynamically typed.

`class Alien(object)`: as well as `class Human(Alien)`: expresses that the Alien class inherits from class object while Human inherits from class Alien.

```python
def __init__(self, type_of):
    self.being = type_of
    global total_aliens
    total_aliens = total_aliens + 1
```

<div style="text-align: center"><small>def, __init__, self, and global</small></div>

`def` is simply how a function is created. it is like `function` in JavaScript or `func` in Golang.

`__init__` is what is automatically run when a new instance of a class is created, it is the initialiser.

`self`: Every method in a class necessitates this first argument. It does not have to be self but this is the convention. This is what the purpose of `self` is, taken from a concise description on Stack Overflow:

- `instance_object.parent_class_method(arg)` internally converts to: `parent_class.parent_class_method(instance_object, arg)`. So `self` binds the instance object to the method invocation, similar to `this` in JS, with some subtleties to be aware of.

Lastly, `global`: writing it as above references the global variable so it can be altered within the functions scope.

```python
super().__init__('human')

def go_back_to_earth(self):
    pass
```

<div style="text-align: center"><small>super and pass</small></div>

`super` interacts with the direct parent class that Human inherits from, Alien. The argument sets `self.being` of the new instance to be equal to `human`.

`pass` is necessary in Python when you write an empty function, an empty `if/else` or anything of the like. If left without `pass` an error occurs.

```python
marcel = Human('Marcel')
print(marcel.name, marcel.being)
```

<div style="text-align: center"><small>Instance of class, print, dot notation</small></div>

A new instance is created as shown. `print` is how one logs out values.

Grabbing values associated with the instance of the class is done with dot notation.

Ok, onto functional programming and a continuation of the story.

<hr />

<i>Human, I have six tasks you must accomplish to leave this planet:</i>

<i>To leave this planet, there is a generator function that runs each instance in which you overcome a problem. This builds up fuel for your spaceship home. This is the function:</i>

```python
liftoff = (x for x in range(17, 100, 17))
```

<div style="text-align: center"><small>[Generator function](https://stackoverflow.com/questions/1756096/understanding-generators-in-python), there will be a longer explanation later</small></div>

<i>First, I give you a list(`['str_1', 'str_2', …]`), six strings will be inside it. You must check what the first letter of each string is numerically (a is 0, b is 1, etc.), then check if this index exists in the list, and finally add that string to a new list. Return the new list.</i>

```python

strings = ['zoological', 'fuggedaboutit', 'turtle', 'buttercup', 'ant', 'damnation', 'rabbit']

def filter_strings(strs):
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    selected_strs = []
    strs_first_letter = []
    for str in strs:
        strs_first_letter.append(str[0])
    for letter in strs_first_letter:
        idx = alphabet.index(letter)
        if idx >= len(strs):
            pass
        else:
            selected_strs.append(strs[idx])
    return selected_strs

print(filter_strings(strings))
```

<div style="text-align: center"><small>list, for in, append, index, len</small></div>

This returns `['damnation', 'fuggedaboutit', 'zoological', 'buttercup']`.

`[]`: in this case it is a list, not an array. They are slightly different.

- The major difference: `array([3, 6, 9, 12])/3.0` (array syntax) returns `array([1, 2, 3, 4])` while `[3, 6, 9, 12]/3.0` (list syntax) returns an error.

`for str in strs`: is the predominant type of loop one sees in Python. It iterates through each index’d value starting at the zeroth index.

`some_list.append(some_value)` pushes the specified value to the end of the list.

`some_list.index(some_value)` looks for `some_value` inside the list and returns the first index where the value exists. If it is not found, a `ValueError` exception occurs.

<hr />

<i>You are at: 17% fuel. Now, a different task. Another function. First argument: a single number. Second argument: a dictionary (`{‘some_key': 'some_value', …}`) containing a key called a_list with a value that is a list full of strings (`'a_list':[...]`) and a separator ( `'separator': ‘something'`). As so: `{‘a_list': […], ‘separator': ‘something'}`. The first argument specifies how many strings to use from the list. Store each string concatenated with the separator into a single variable or memory location and return that.</i>

```python
def seperate_arbitrary_amount_words(num, dic):
    word_sequence = ""
    for i in range(num):
        word_sequence += dic['a_list'][i]+dic['seperator']
    return word_sequence

print(seperate_arbitrary_amount_words(3,
    {'a_list': ['Trump', 'That thing over there', 'Global warming', 'monkeys', 'coconuts'],
     'seperator': ' is awful! '}),'\n')
```

<div style="text-align: center"><small>range, dictionary</small></div>

This returns: `‘Trump is awful! That thing over there is awful! Global warming is awful! ’`

`range(num)` is an iterator of the number specified. If only one argument it iterates from zero to the number minus one. Range can take three arguments, it is similar to a condensed for loop: `range(-10, -100, -30)` => `-10 -40 -70` with whatever `for this_thing_is in range(...)` being the => values.

`{...}`: dictionaries are unordered key/value pairs or associative arrays. The keys must be strings and to access the values through bracket notation one must also insert a string value, or a variable name.

<hr />

<i>Your now at: 34%. Next, I give a more confusing challenge. For one, you do not know how many arguments are given! The first set of arguments contain either a number, the value None, or a string. The second set contains key/value pairs associated in this way: `some_keyword=some_value`. `some_keyword` will be a string. `some_value` will be a number. Return a dictionary. One key/value. The key must be only the strings I first gave you (the arguments) in reverse order. The value must be a concatenated string, only use the string in the keywords from the zero index up to the number specified as the value, all into one single string without spaces.
</i>

```python
def rev_args_key_concat_keywords_val(*args, **keywords):
    dic = {}
    rev_args_key = ""
    concat_keywords_val = ""
    args_len = len(args)
    args = reversed(args)
    for idx, arg in enumerate(args):
        if arg is None:
            continue
        elif isinstance(arg, int):
            continue
        else:
            rev_args_key += arg
        if idx != args_len-1:
            rev_args_key += ' '
    for keyword in keywords:
        for idx in range(keywords[keyword]):
            concat_keywords_val += keyword[idx]
    dic[rev_args_key] = concat_keywords_val
    return dic

print(rev_args_key_concat_keywords_val
      ('animal', 'amazing', None, 6,
       'big', element=3, phone=2, anteater=3))
```

<div style="text-align: center"><small>tuples (reversed), enumerate, if/elif/else, is None, isinstance(arg, int)</small></div>

This logs out: `{‘big amazing animal’: ‘elephant’}`.

If you print out args prior to `reversed(args)` you see that args is: `(‘animal’, ’amazing', None, 6, ‘big')`. This is a tuple. A sequence of immutable objects. Tuples are written with parentheses and they cannot be altered the same way as a list or array, as in, altering at specific indexes.

`enumerate` allows one to have an automatic counter and access the values simultaneously.

`if/elif/else` is how to write if/else statements.

`is None` is how one returns a true or false value for checking the `None` value. It is similar to `null` but more so `undefined` in JS as many instances of code can return this value such as when one alters a list through a higher order function that one would not expect to return something or when a function does not return anything, it returns `None`.

`isinstance(arg, int)` is used to check if the arg is an instance of a specified class. `int` in this case but something like this can also be expressed:

- `isinstance(marcel, Alien)` will return true. Classes, strings, ints, and all else you expect can be checked in this way.

<hr />

<i>Ok, good. You are at 51%. Now, an interesting one. You are given a matrix. Three lists in a list, each list has four strings inside. First, make a new list associating each index of each list as so: (`[[[0][0], [1][0], [2][0]…],[[0][1], [1][1]…], ...]`) then, flatten each list to a single string, and finally join that list into one single string. You can fit all of this logic into one statement… a list comprehension.</i>

```python

matrix = [
    ['You ', 'it ', 'way. ', 'magically, '],
    ['must ', 'look ', 'Very ', 'important '],
    ['make ', 'this ', 'extremely, ', 'to do!']
    ]

def flatten_matrix(matrix):
    return ''.join(
        [
        str for sublist in
        [
            [row[i] for row in matrix]
            for i in range(4)
        ]
        for str in sublist
        ]
    )

print(flatten_matrix(matrix), '\n')
```

<div style="text-align: center"><small>This needs explanation…</small></div>

This returns: `You must make it look this way. Very extremely, magically, important thing to do!`

First: `[[row[i] for row in matrix] for i in range(4)]`. The same thing:

```python
transposed = []
for i in range(4):
    transposed_row = []
    for row in matrix:
        transposed_row.append(row[i])
    transposed.append(transposed_row)
```

<div style="text-align: center"><small>new list => loop through rows => append values into new row => append row into new list</small></div>

One must think from the most outward brackets/logic in.

So: `[all_the_logic]` is to say: create a new list and whatever is done inside here will determine what the list looks like in the end.

`[[some_inner_logic] for i in range(4)]:` This will specify there to be 4 rows and whatever `[row[i] for row in matrix]` results in at each instance is what each row will be.

`[row[i] for row in matrix]` means to use the index, i (0, 1, 2, 3) from range as be aware it is constant while the first, second, third, and fourth row is being created. During each row creation this occurs:

- Loop through each row in `matrix` => push value at `row[i]` into this newly created list => append this list to the initially created list.

At this point this is what is created: `[['You’, ‘must', ‘make'], ['it', ‘look', ‘this'], ['way.', ‘Very', ‘extremely,'], ['magically', ‘important', ‘to do!']]`. A transposed matrix.

Onto: `[str for sublist in [transposed_matrix] for str in sublist]`

```python
flat_list = []
for sublist in matrix:
    for str in sublist:
        flat_list.append(str)
```

<div style="text-align: center"><small>new list => individual string in row => append strings to new list</small></div>

Again, outward brackets to innermost.

Create new list: `[result_of_logic]`

Read from the furthest-to-left for loop: `sublist in [transposed_matrix]` is to say: loop through each list within the matrix, starting at the first.

Then read onto the next for loop: `for str in sublist`. This equates to saying to loop through each `str` within this `sublist`. That is the value now available to append to the list.

Lastly, look at the beginning of the list comprehension: `str` . That is what is appended to the list: `['current_str', 'second_str', ...]`. So the left-most value is what is, in a way, pushed into the newly created list until the loop is finished. As if `append` automatically occurs.

As for: `''.join(final_list)` , `''` is the string separator.

Notice how the left-most `for` loop is what first occurs and the further to the right one goes is the nesting.

<hr />

<i>Ok, now you are at 68%, only two left to go! This one I need you to create a factory function. There will be five functions to implement. `append` (push to end of list), `extend` (concat one list to another list), `insert` (insert item into specific index), `remove` (removes each instance of item specified), and `pop` (pop off final item in list). You cannot use the higher order function equivalents and each function that you create <strong>cannot mutate the original list</strong>. You are given three or four arguments.

1. a list
2. the name of the function as a string
3. the one argument the function needs, index if it needs four (for insert)
4. an item (only needed for insert)

Ok, good luck!</i>

```python
def implement_higher_order_funcs(li, func_name, *args):

  def append(the_list, item_to_append):
    return the_list + [item_to_append]

  def extend(list_one, list_two):
    return list_one + list_two

  def insert(the_list, idx, item):
    return the_list[:idx] + [item] + the_list[idx:]

  def remove(the_list, item):
    return [x for x in the_list if x != item]

  def pop(the_list):
    return the_list[:len(the_list)-1]

  if func_name == 'append':
    return append(li, args[0])
  elif func_name == 'extend':
    return extend(li, args[0])
  elif func_name == 'insert':
    return insert(li, args[0], args[1])
  elif func_name == 'remove':
    return remove(li, args[0])
  elif func_name == 'pop':
    return pop(li)
  else:
    return None
```

<div style="text-align: center"><small>slices, list concatenation</small></div>

Know that each of these functions are not the optimal way to do this. Using the associated higher order function is much quicker. Also, know that the higher order functions all return `None` except `pop` which returns what was popped.

`append` and `extend`: This is simply a subtlety of Python. Adding a list to another list automatically concats the two lists. `li.append(item)` and `li.extend(other_li)` is the proper syntax but these two options mutate the original list while the ones written above do not. `other_li` in `extend` is not mutated though.

`insert` and `pop` both use slices in this case. I’ll focus on insert . Notice: `the_list[:idx]` : this means to slice the list up to the index but not including it. `the_list[idx:]` : is to say to slice from and including the index up to the last index of the list.

`remove` : a simple list comprehension (they are extremely fast operations btw). `[x for x in the_list if x != item]`: `new_list = []` => `for x in the_list`: => `if x != item`: => `new_list.append(x)` or, but not technically `new_list += [x]`. Though, be aware that the real `li.remove(item)` solely removes the first occurrence of the item. This remove removes all occurrences.

<hr />

<i>Very well done, onto the next one. Your at 85% fuel, this is the last one! Next one is a bit of an oddity as it is two functions in one. I am to give you a wide assortment of keywords and arguments. Your function will be called multiple times with a random amount of arguments or no arguments. And/or a multiple assortment of keywords. I need you to store all the argument values that I give you in a non-global list, and all the keyword values in a non-global dictionary. Return a dictionary as so: `{'the_list': [...], 'the_dictionary': {...}}`. Each time the function is called the list is altered or the dictionary depending upon the input and <strong>all values are appended to the previous calls values</strong>.

In the end, the final calls list is unpacked as the first argument and the dictionary is unpacked as the second argument into another function.</i>

```python
def dictionary_and_list(*args, li=[], dic={},**keywords):
    if len(args) > 0:
        for arg in args:
            li.append(arg)
    if len(keywords) > 0:
        for keywd in keywords:
            dic[keywd] = keywords[keywd]
    return {'a_list': li, 'a_dictionary': dic}

dictionary_and_list('Ok, ', 'you ', 'are done, ')
dictionary_and_list('it is time ', heading=3, back=2)
dictionary_and_list('to leave this ', 'Python world. ',
                    'Congratulations on all your accomplishments! ', to=1)
dictionary_and_list('Goodbye!', earth=0)

def back_to_earth(*args, heading='Is', back='it', to='yet', earth='time?'):
  last_words = 'Ok, your there: ' + str(liftoff.__next__()-2) + '%! '
  for arg in args:
    last_words += arg
  last_words += '\nHeading\n' + str(heading) + '\nback\n' + str(back) + '\nto\n' + str(to) + '\nearth!\n' + str(earth)
  print(last_words)

back_to_earth(*dictionary_and_list()['a_list'], **dictionary_and_list()['a_dictionary'])
```

<div style="text-align: center"><small>mutating default arguments, unpacking a list, unpacking an object</small></div>

`(*args, li=[], dic={}, **keywords)`: Notice that the two arguments that are not keywords or arguments are in between these two calls, this is required.

But the really odd part, why is `li` and `dic` continually mutated during each function call? <strong>Python does not create a copy of each argument for each function call</strong> but holds a reference to the original default argument, and if one is not careful they can easily fall into the trap of creating a function that is not pure.

As for this: `back_to_earth(*dictionary_and_list()['a_list],` : this is how one can unpack a list into a function so each item in the list becomes an individual argument. Values are grabbed with `*args`. As for `**dictionary_and_list()['a_dictionary])`: this unpacks the dictionaries values into the functions arguments. Each keyword in the function that has an associated key in the dictionary will be given that value.

And what the code outputs:

<blockquote>

Ok, you're there: 100%! Ok, you are done, it is time to leave this Python world. Congratulations on all your accomplishments! Goodbye!

Heading

3

back

2

to

1

earth!

0

</blockquote>

Last but not least, after each function was finished I ran `liftoff.__next__()`. As you can see in the code below. One thing to know. If it is run one more time an error occurs. Why? Well, generator functions can only be read once and never again. So when the iteration is finished, there is no longer a `.__next__()` and all previous values have been garbage collected.

All the code in one place:

```python
totalaliens = 90328443435329598
totalhumans = 7530305889
totalpythons = 2

print('In a universe of:', totalaliens, 'alien beings. Two new beings came from the void...', '\n')

class Alien(object):
    def __init__(self, type_of):
        self.being = type_of
        global totalaliens
        totalaliens = totalaliens + 1

class Human(Alien):
    def __init__(self, name):
        self.name = name
        self.tasks_to_accomplish = 6
        super().__init__('human')
        global totalhumans
        totalhumans = totalhumans + 1

    def go_back_to_earth(self):
        pass

class Python(Alien):
    def __init__(self, name):
        self.name = name
        super().__init__('python')
        global totalpythons
        totalpythons = totalpythons+1

marcel = Human('Marcel')

print('Hello', marcel.being, '. Your name is ', marcel.name, 'no? And you are one of', totalhumans, 'human beings.', '\n')

guido = Python('Guido')

print('I am a', guido.being,'and my name is', guido.name,'one of', totalpythons, 'python beings.', '\n')

print('Right now there are:', totalaliens, 'alien beings.', '\n')

print('Human, there are 6 tasks you must accomplish to leave this planet:', '\n')

print('To leave this planet, there is a generator function that runs each instance in which you overcome a problem. This builds up fuel for your spaceship home. This is the function.\n')

liftoff = (x for x in range(17, 105, 17))

print('First, I give you a list([thing_1, thing_2...]), six strings will be inside it. You must check what the first letter of each string is numerically (a is 0, b is 1, etc.), then check if this index exists in the list, and finally to add the string if it does to a new list. Return the new list.', '\n')

strings = ['zoological', 'fuggedaboutit', 'turtle', 'buttercup', 'ant', 'damnation', 'rabbit']

def filter_strings(strs):
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    selected_strs = []
    strs_first_letter = []
    for str in strs:
        strs_first_letter.append(str[0])
    for letter in strs_first_letter:
        idx = alphabet.index(letter)
        if idx >= len(strs):
            pass
        else:
            selected_strs.append(strs[idx])
    return selected_strs

print(filter_strings(strings), '\n')

print('You are at:', str(liftoff.__next__()), '%. Now a different task. Another function. First argument: a single number. Second argument: a dictionary ({"some_key": "some_value", ...}) containing a key called a_list with a value that is a list full of strings (‘a_list’: […], and a separator to separate each word (‘separator’: ‘something’. As so: {‘a_list’: […], ‘seperator’: ‘something’}. You must return only the amount of words the number specifies from the list starting at index zero and each string is separated by the separator as a single string.', '\n')
def seperate_arbitrary_amount_words(num, dic):
    word_sequence = ""
    for i in range(num):
        word_sequence += dic['a_list'][i]+dic['seperator']
    return word_sequence

print(seperate_arbitrary_amount_words(3,
    {'a_list': ['Trump', 'Genghis Khan', 'That noisy person', 'monkeys', 'coconuts'],
     'seperator': ' is terrible! '}), '\n')

print('Your now at:', str(liftoff.__next__()), '%. Next, I give a more confusing challenge. For one, you don’t know how many arguments are given! The first set of arguments contain either a number, the value None, or a string. The second set contains key/value pairs associated in this way: some_keyword = some_value. some_keywordwill be a string. some_valuewill be a number. I want a dictionary to be returned. The key must be only the strings I first gave you (the arguments) in reverse. The value must be a concatenated string, only using the string in the keywords from the zero index up to the number specified as the value.', '\n')

def rev_args_key_concat_keywords_val(*args, **keywords):
    dic = {}
    rev_args_key = ""
    concat_keywords_val = ""
    args_len = len(args)
    args = reversed(args)
    for idx, arg in enumerate(args):
        if arg is None:
            continue
        elif isinstance(arg, int):
            continue
        else:
            rev_args_key += arg
        if idx != args_len-1:
            rev_args_key += ' '
    for keyword in keywords:
        for idx in range(keywords[keyword]):
            concat_keywords_val += keyword[idx]
    dic[rev_args_key] = concat_keywords_val
    return dic

print(rev_args_key_concat_keywords_val('animal', 'amazing', None, 6, 'big', element=3, phone=2, anteater=3), '\n')

print('Ok, good. You are at:', liftoff.__next__(), '%. Now, the most interesting one. You are given a matrix. Three lists in a list, each list has four strings inside. I want you to first make a new list associating each index of each list as so: ([[[0][0], [1][0], [2][0]…],[[0][1], [1][1]…],...]) then I want you to flatten each list to a single string and then join that list into one single string. You can only use one return statement to do this!\n')

matrix = [
    ['You ', 'it ', 'way. ', 'magically, '],
    ['must ', 'look ', 'Very ', 'important '],
    ['make ', 'this ', 'extremely, ', 'to do!']
    ]

def flatten_matrix(matrix):
    return ''.join(
        [
        item for sublist in
        [
            [row[i] for row in matrix]
            for i in range(4)
        ]
        for item in sublist
        ]
    )

print(flatten_matrix(matrix), '\n')

print('Ok, now you are at:', liftoff.__next__(), '%, only two left to go! This one I need you to create nested functions in a function. There will be five functions to implement: append, extend, insert, remove, and pop. You cannot use the higher order function equivalents and each function that you create cannot mutate the original list. You are given three or four arguments. 1. a list 2. the name of the function as string 3. the one argument the function needs, index if it needs four 4. an item for insert function. Ok, good luck!\n')

def implement_higher_order_funcs(li, func_name, *args):

  def append(the_list, item_to_append):
    return the_list + [item_to_append]

  def extend(list_one, list_two):
    return list_one + list_two

  def insert(the_list, idx, item):
    return the_list[:idx] + [item] + the_list[idx:]

  def remove(the_list, item):
    return [x for x in the_list if x != item]

  def pop(the_list):
    return the_list[:len(the_list)-1]

  if func_name == 'append':
    return append(li, args[0])
  elif func_name == 'extend':
    return extend(li, args[0])
  elif func_name == 'insert':
    return insert(li, args[0], args[1])
  elif func_name == 'remove':
    return remove(li, args[0])
  elif func_name == 'pop':
    return pop(li)
  else:
    return None

print('Very well done, onto the next one. Your at:', liftoff.__next__(), '%, only two left to go! Next one is a bit of an oddity and it is completely connected to the one following. I am to give you a wide assortment of keywords and arguments. I will call your function multiple times with a random amount or no arguments. I need you to store all the argument values that I give you in a non-global list, and all the keyword values in a non-global dictionary. Return a dictionary as so: {"the_list": [...], "the_dictionary": {...}}. Each time the function is called the list is altered or the dictionary depending upon the input.\n')

def dictionary_and_list(*args, li=[], dic={},**keywords):
    if len(args) > 0:
        for arg in args:
            li.append(arg)
    if len(keywords) > 0:
        for keywd in keywords:
            dic[keywd] = keywords[keywd]
    return {'a_list': li, 'a_dictionary': dic}

dictionary_and_list('Ok, ', 'you ', 'are done, ')
dictionary_and_list('it is time ', heading=3, back=2)
dictionary_and_list('to leave this ', 'Python world. ', 'Congratulations on all your accomplishments! ', to=1)
dictionary_and_list('Goodbye!', earth=0)

def back_to_earth(*args, heading='Is', back='it', to='yet', earth='time?'):
  last_words = 'Ok, your there: ' + str(liftoff.__next__()-2) + '%! '
  for arg in args:
    last_words += arg
  last_words += '\nHeading\n' + str(heading) + '\nback\n' + str(back) + '\nto\n' + str(to) + '\nearth!\n' + str(earth)
  print(last_words)

back_to_earth(*dictionary_and_list()['a_list'], **dictionary_and_list()['a_dictionary'])
```

And the repl:

[Repl](https://repl.it/@jerrymuzsik/pythonIntroductionArticle)

![Spacy alternative planet with something like the loch ness monster out of the water](https://cdn-images-1.medium.com/max/1600/1*L4A683TJgtsEyCueGJLVNA.png)

<div style="text-align: center"><small>This is Guido, Python alien</small></div>

A few other things to be aware of:

1. Filenames, variable names, and function names are named with underscores.
2. Indentation: 4 spaces is the convention.
3. CamelCase is not used much, only in classes.
4. If the variable is globalthenitisalllowercase (if a variable is global then it is all lowercase).
