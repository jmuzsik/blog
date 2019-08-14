---
title: React tutorial
template: 'post'
image: "https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.5.27410.JPG"
alt: "guy stacking boxes somehow symbolising a tutorial"
draft: false
slug: '/tutorials/create-and-deploy-create-react-app/'
category: 'Tutorials'
tags:
  - 'Tutorials'
  - 'Real article'
description: 'I recently built an app utilising data from the WHO (World Health Organisation), the WikiQuotes API, Recharts, lots of CSS and JS, and, of course, passion for the subject. This will show you how to do it minutely.'
---

Before beginning a project there is one thing you must know, and that is what exactly you are passionate about. I’ll leave that fundamental conundrum to you. Personally, I love to dwell on life on Earth and the folks on it with all the disparate forces within their lives. I decided to do this:

- Ten data sets containing data expressing something intense about life. Ten charts to create a user experience with the data.
- Ten quotes correlating with the data, from the WikiQuotes API.

This is what the app looks like in the end:

[Deployed Link](https://jmuzsik.github.io/quote_and_a_chart/)

This guide will be separated as so:

1. Creating the app with Create React App
2. Manipulation of data to create charts with Recharts
3. Utilising the WikiQuotes API to scrape quotes
4. Dynamically changing pages and passing props
5. Deploying on Github Pages

<hr />

## Creating a React App

1. npm install -g create-react-app
2. Then this: create-react-app name_of_app_you're_creating
3. This creates a directory with the file structure within it
4. Go into this new directory
5. npm start or yarn start
6. Take a peak at the file structure

```shell
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
  data/
```

### node-modules?

- Contains countless lines of code written by some smart folks to do all sorts of heavy lifting for you so you can simply focus on the easy-to-conceptualise part of writing code (functions that do relatable things and visual aspects)

### public?

- Here is the HTML file that will be rendered on the page, the starting point of your app, visually.
- `favicon.ico`, that’s that little image on your tab. It is referenced in the `manifest.json`
- The `manifest.json is mainly used for metadata

### src

This is where just about everything you write will be located

See the `index.css` and the `App.css`. Both do the same thing. I thought of it this way. What will I want to occur visually globally throughout the app? Put that into the `index.css`. All else put into the `App.css`. It’s a small app.

The `registerServiceWorker.js`, this creates ‘workers’ that do tasks to improve a users experience with a website as well as improving the functioning of the site as a whole.

The `index.js` is linking the `index.html` to everything you are to write.

The juicy part, the `App.js`, is your app. This is the dwelling place. The place where everything comes together. Personally, I deleted everything in the return statement except the `div` as I did not want a header.

Notice the data folder I have there. Go find some data, personally I used: WHO data and clicked around until I found data of interest. After the JSON is downloaded, move the files to the data folder.

Now, onto the actual writing of code.

![hands typing on a futuristic looking keyboard](https://cdn-images-1.medium.com/max/1600/1*E4vQx_QoYJIdhMZJMwBpSg.png)

How many individual pages will you have? Well, you should create a component for each one. The beginning of my plan was this. Ten files of data to create ten charts. So I will show how to create the charts.

First, create a new folder to hold these components that you will create and simultaneously create the files associated.

<hr />

## Manipulation of data and creation of charts

I’ll show you how to create this chart:

![A page with a chart related to the sexual transmission of AID's by country and year with a quote at the top of the page](https://cdn-images-1.medium.com/max/1600/1*0-8PcqFHOv5InnYhIitdEw.png)

<div style="text-align: center;"><small>I did mention expressing something intense about life</small></div>

Link to data if curious: [Data Set](https://apps.who.int/gho/data/view.main.vEQKNHIVTOTv)

With data originally structured as so:

```json
{
   "dimension": [
                   many_irrelevant_objects
                ],
   "fact": [
    {
                   "dims": {
                               "COUNTRY": "Afganhistan",
                               "YEAR": "2010",
                               "GHO": "Knowledge about sexual
                               transmission of AIDS",
                               "SEX": "Female"
                           },
                   "Value": "8.8"
    },
              ...many_more_objects of same format
           ]
}
```

For my chart I want the data to end up looking like this:

```json
[
  {
    "year": "1993",
    "Burkina Faso": 16,
    "Ghana": 0,
    "Kenya": 0
  },
  ...,
  {
    "year": "2010",
    "Burkina Faso": 80.4,
    "Ghana": 75.05,
    ...
  }
]
```

#### Formatting the data

Notice how the initial format has the odd `“dimension”` field which is unneeded, all that is needed is within `"fact"`‘s `"dims"` and `"Value"`. So, here I am grabbing those values and setting them to an individual object.

```javascript
const initialReformat = data => {
  let temp = {};
  return data.fact.map(row => {
    temp = row.Value;
    row = row.dims;
    row.Value = temp;
    return row;
  });
};
```

I now have this:

```javascript
[
   {
     COUNTRY: 'Afghanistan',
     YEAR: '2010',
     GHO: 'Knowledge about sexual transmission of AIDS',
     SEX: 'Female',
     Value: '8.8'
   },
   ...
]
```

Next, I created an object, set each year to a key whose value is to be an array of every piece of data with a YEAR value correlating.

```javascript
const sortDataByYear = data => {
  var sortByYear = {};
  data.forEach(row => {
    if (!sortByYear[row.YEAR]) {
      sortByYear[row.YEAR] = [];
      sortByYear[row.YEAR].push(row);
    } else {
      sortByYear[row.YEAR].push(row);
    }
  });
  return sortByYear;
};
```

Quite simple, check if year does not exist, if so, create a new array and push that data into it. Otherwise, push the data into the year array that has already been created.

And I end up with this object:

```javascript
{
   1992:
      [ { COUNTRY: 'Malawi',
          YEAR: '1992',
          GHO: 'Knowledge about sexual transmission of AIDS',
          SEX: 'Male',
          Value: '0.0' },
          ...
      ],
    1993: [...],
    ...
}
```

Now, the last function to get the necessitated data structure for the chart:

```javascript
const finalData = [];
for (const year in sortByYear) {
  finalData.push({ year });
  sortByYear[year].forEach(obj => {
    if (parseFloat(finalData[i][obj.COUNTRY]) > 0) {
      finalData[i][obj.COUNTRY] =
        (finalData[i][obj.COUNTRY] + parseFloat(obj.Value)) / 2;
    } else finalData[i][obj.COUNTRY] = parseFloat(obj.Value).toFixed(2);
  });
  i++;
}
```

First, I made a brand new array to store the final data. Then, I created a new object for each year and set that year as one of the objects key/value pairs (`finalData.push({ year })`). Lastly, I looped through the array corresponding with the year from the previous functions returned object: `sortByYear`.

Inside this array, I have two layers to check:

1. Has the country been set as a key for the object in the final data array?
2. If it has not, it means that I am seeing a different sex (gender), so I should average this number with the previous, `(finalData[i][obj.COUNTRY] + parseFloat(obj.Value)) / 2`.

`i` is used so the next year is in the next index of the array.

[progression of data from a mess to sorted to arranged and finally to be presented visually](https://cdn-images-1.medium.com/max/1600/1*-2BFByeRl2z0UFbamfN91Q.png)

We are at the arranged point. Though, a quick description of the creation of a react component will happen next. Then the visual presentation.

#### Taking a look at the rendering of a React Component

1. import React, { Component } from 'react'
2. Create a class and a constructor

```javascript
class HIVKnowledge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            quote: ""
        }
    }...
```

3. Import the data and when the “component mounts”, set the state of the data.

```javascript
const HIVKnowledgeData = require('../data/diseases-hiv-knowledge.json');
...where I left off above
componentDidMount() {
    const data = []
    data = initialReformat(HIVKnowledgeData)
    this.setState({ data })
}
```

`componentDidMount` runs when the page is “mounted” or ready to load and whatever is put here affects the initial rendering.

4. Final data management prior to rendering the page:

```javascript
render() {
    let sortByYear = [],
      finalData = [],
      i = 0
    if (this.state.data.length > 0) {
        sortByYear = sortDataByYear(this.state.data)
        ...then run the last data function on sortByYear
}
```

Check if the length is greater than zero, as `componentDidMount` does not occur immediately. So, at the first check of this if statement the data will be an empty array, which is not at all what we want to be inputted into our graph.

#### The creation of the chart and the rendering of the page

`npm install recharts`

What to import from recharts:

`import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';`

What to put into your index.html right above the `<title>` tag (also change that if you want the tab to say something other then React App).

```html
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
/>
<script
  src="https://code.jquery.com/jquery-2.1.3.min.js"
  integrity="sha256-ivk71nXhz9nsyFDoYoGf2sbjrR9ddh+XDkCcfZxjvcM="
  crossorigin="anonymous"
></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
```

What to put in your render’s return statement:

```js
return (
     <div className="chart bar HIV">
          <h6>Knowlege about sexual transmission of AIDS (Average
          Both Sexes)</h6>
          <ResponsiveContainer width='100%' height={300}>
              <LineChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={finalData}
               >
               <XAxis dataKey="year" />
               <YAxis />
               <CartesianGrid strokeDasharray="3 3" />
               <Tooltip />
               <Line
                   connectNulls={true}
                   type="monotone"
                   dataKey="Zambia"
                   stroke="black"
               />
               ...rest of lines and closing tags
```

This is what will render on the page. This is JSX. The className is React’s way to set class. Otherwise, the `<h6>`is as one expects and notice how the graph is quite HTML’y as well. Notice, a defining factor of JSX components is the camelCase.

As for the chart:

The responsive container does exactly what one expects, gets larger and smaller based upon the screen size.

`width`, `cx`, `cy`, and `outerRadius` are not random numbers. This is a recipe to get a centered location for the chart on your page.

`data={finalData}` is how the data is inputted into the chart.

`<XAxis datakey=”year” />` is what sets the years as the… x-axis, very complex.

`<Tooltip />` creates a nice user interaction when hovering over data.

`<Line … />` is each line with the color, country (key in the array), and `connectNulls` will do just that, if the next year is a distance away, the line will connect. Helpful with this data as many countries skip many years between studies.

#### Export the component at end of file

`export default HIVKnowledge`

#### Import the component in App.js

`import HIVKnowledge from ‘./poem-1-data/HIVKnowledge’`

#### Render the chart component

Put `<HIVKnowledge />` inside the div within the return statement of the render method.

You should now see the the chart on the page.

## Utilising the WikiQuotes API to render quotes

1. I used this module readily available on github: https://github.com/natetyler/wikiquotes-api

- Copy and paste it into a file in your app. I used a file called WikiQuote.js.

2. Import jQuery at the top of this file:

- `import * as $ from ‘jquery’`

3. Export the module:

- `export const WikiquoteApi = ...`

4. Create the necessary error callback:

```js
export const error = err => {
  console.error(err);
};
```

5. Import into the chart component:

`import { WikiquoteApi, error } from ‘../WikiQuote.js’`

6a. Create the `success` callback function within the `componentDidMount` so that the `quote` variable is set when this is called:

```js
const success = wikiData => {
  quote = `"${wikiData.quote}"`;
};
```

6b. Create a `checkQuoteLength` function that waits for the WikiQuote function to finish (this is asynchronous), repeatedly calling itself until that occurs, setting state immediately. Put this also in the `componentDidMount`

```js
const checkQuoteLength = () => {
  if (quote.length > 0) {
    this.setState({ quote, data });
  } else {
    setTimeout(checkQuoteLength, 100);
  }
};
```

6c. Invoke `checkQuoteLength`:

`checkQuoteLength()`

6d. Call the `WikiquoteApi.getRandomQuote(title_to_search_in_wikiquotes, success, error)`:

```js
componentDidMount () {
  let quote = "", data = []
  const success = (wikiData) => {
    quote = `"${wikiData.quote}"`
  }
  const checkQuoteLength = () => {
    if (quote.length > 0) {
      this.setState({ quote, data })
    } else {
      setTimeout(checkQuoteLength, 100)
    }
  }
  WikiquoteApi.getRandomQuote("HIV/AIDS", success, error)
  data = initialReformat(HIVKnowledgeData)
  checkQuoteLength()
}
```

7. Render the Quote:

```js
return (
     <div className="chart bar HIV">
          <h6>Knowlege about sexual transmission of AIDS (Average
          Both Sexes)</h6>
          <p>{this.state.quote}</p>
          <ResponsiveContainer width='100%' height={300}>
          ...
```

Voila! Now the quote exists on the webpage.

But you only have a single page with one chart, create more charts at this time before moving on if you are planning to. Next, what will be shown is how to go from one page to the next in a simple way.

<hr />

## Dynamically changing pages and passing props

### Creating some buttons:

I used [CSS Button Generator](https://www.css3buttongenerator.com/) to make my life easier.

### Creating a buttons component, for a left and a right button:

1. Make a file called `Buttons` that will contain the HTML for the buttons.
2. Create a class component (same as previously done) with two initial states, `leftButtonDisable: true` and `rightButtonDisable: false`.
3. In the return create the buttons:

```js
<div className="buttons">
  <button
    className="btn"
    value="left"
    disabled={this.state.leftButtonDisable}
    onClick={this.handleClick}
  >
    ◀
  </button>
  <button
    className="btn"
    value="right"
    disabled={this.state.rightButtonDisable}
    onClick={this.handleClick}
  >
    ▶
  </button>
</div>
```

4. Create the handleClick class method:

```js
handleClick(event) {
  let value = 0
  if (event.target.value === "left") {
    value--
    this.props.onPageChange(value)
  } else {
    value++
    this.props.onPageChange(value)
  }
}
```

Set value to zero, and if it is left then decrement it, otherwise increment it. And pass that value into… `this.props.onPageChange`. Will go over this next.

5. Export the component

### Within the App.js:

1. `import Buttons from ‘./Buttons’`
2. Create a `currentPage` state and set it to zero: `currentPage: 0`
3. Create an `onPageChange` class method and set the `this` context to allow the corresponding page to render

```js
constructor (props) {
  ...
  this.onPageChange = this.onPageChange.bind(this)
}
onPageChange(value) {
  const currentPage = this.state.currentPage + value
  this.setState({ currentPage })
}
```

4. Put the `Buttons` component in the render and pass `onPageChange` and `currentPage` as props to the `Buttons` component

```js
<Buttons
  currentPage={this.state.currentPage}
  onPageChange={this.onPageChange}
/>
```

### Back to the Buttons Component

Use the life cycle method `componentWillRecieveProps` to know when to disable buttons

```js
componentWillReceiveProps(nextProps) {
  let currentPage = nextProps.currentPage
  if (currentPage === 0) {
    this.setState({
      leftButtonDisable: true
    })
  }
  else if (currentPage === 9) {
    this.setState({
      rightButtonDisable: true
    })
  } else {
    this.setState({
      leftButtonDisable: false,
      rightButtonDisable: false
    })
  }
}
```

This runs whenever the props that `App.js` is passing down to `buttons.js` changes, in this case, `currentPage` changes. When currentPage changes `componentWillReceiveProps` runs and `nextProps` is an object with key/values of the props being passed down as the incoming value. This allows you to alter the state at this instance, and in turn alter the component being viewed visually on the page.

### Rendering different pages based upon currentPage

1. Create a render page class method in `App.js`

```js
renderPage(curPage) {
  switch (curPage) {
    case 0:
      return <HIVKnowledge />
    case 1:
      return <LifeExpectancy />
    ...
    default:
      return console.error("Something is wrong with your buttons")
  }
}
```

2. call this function in the `return` statement of the `render` class method

```js
<div className="App">
  {this.renderPage(this.state.currentPage)}
  <Buttons
    currentPage={this.state.currentPage}
    onPageChange={this.onPageChange}
  />
</div>
```

And now, possibly, hopefully you know how to create a multi-page react app (It's still single page though).

### Deploying the App to Github Pages

Info is thanks to [this Medium Article](https://www.freecodecamp.org/news/surge-vs-github-pages-deploying-a-create-react-app-project-c0ecbf317089/).

1. Go to your `package.json` and add two new fields as so:

```js
{
    ...
    "private": true, //below this add:
    "homepage": "https://github_username.github.io/repository_name",
    ...
    "scripts": {
        "eject": "react-scripts-eject", //below this add:
        "deploy: "npm run build&&gh-pages -d build"
    ...
}
```

2. Then do this: `npm install --save-dev gh-pages`. Push your code to master.
3. `npm run build`which will create a bundle of all the code in your application (after running it, look in your file system and you will see a build folder containing all of the code in a tightly woven, unreadable format).
4. `npm run deploy` is the last step in the terminal
5. Go onto your GitHub account. Go to the applications page, then to settings, scroll down until you reach the GitHub Pages, click the Source dropdown and find `gh-pages branch`then wait a moment and you are…

Deployed!

In the future, if you edit some code or something similar be sure to run `npm run build` then `npm run deploy` for your deployed app to be affected!

## In Closing

No matter your skill level in React, I aimed to make sure this article held nuances that anyone can learn from. This was written directly after completing the aforementioned project so the troubles, the tribulations are fresh on my mind (in relation to the person I am this moment, while I am typing these words, that are reference).

Still there are countless resources in React, and this is only a few of a giant assortment of resources. If you read this but know there is something else you want to do, check this repo out: [awesome-react-components](https://github.com/brillout/awesome-react-components).

And this is the repo: [Quote and a Chart](https://github.com/jMuzsik/quote_and_a_chart)

Thanks for reading!
