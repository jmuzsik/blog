---
title: PWA Starter Kit
template: 'post'
draft: false
slug: '/web-component/pwa-starter-kit'
category: 'Web Components'
tags:
  - 'PWA Starter Kit'
description: 'Some notes on PWA Starter Kit.'
---

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

`installRouter((location) => handleNavigation(location));` - The `handleNavigation` function is located in `src/actions/app.js`. - 1st param is the history object and the second is the event object.

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
installMediaQueryWatcher(`(min-width: 600px)`, matches => {
  console.log(matches ? 'wide screen' : 'narrow sreen');
});
```

### one-way data binding

Basically this is React:

```js
render() {
    return <input value={this.state.value} onChange={this.handleChange} />
}
handleChange(e) {
    this.setState({value: e.target.value});
}
```

### If saving to local storage, do something like this:

```js
export const saveState = state => {
  let stringifiedState = JSON.stringify(state);
  localStorage.setItem(MY_KEY, stringifiedState);
};
export const loadState = () => {
  let json = localStorage.getItem(MY_KEY) || '{}';
  let state = JSON.parse(json);

  if (state) {
    return state;
  } else {
    return undefined; // To use the defaults in the reducers
  }
};
// ...
export const store = createStore(
  state => state,
  loadState(), // If there is local storage data, load it.
  compose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk)
  )
);

// This subscriber writes to local storage anytime the state updates.
store.subscribe(() => {
  saveState(store.getState());
});
```
