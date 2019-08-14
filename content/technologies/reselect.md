---
title: Reselect
template: 'post'
draft: false
slug: '/technologies/reselect'
category: 'Technologies'
tags:
  - 'Reselect'
  - 'Technologies'
description: 'Some notes about what the redux reselect library is.'
---

## Reselect

Basically, at times where you are mapping state to a component. If the state being passed is a new object or array with the same data, then the component will render again. So, reselect will prevent a new object, array, etc. from being created when the data does not change.

During times where the selector is in a reuseable component:

```js
// The reuseable component file
// ...
function ReuseableComponent({ someState }) {
  return <somehtml>{someState}</somehtml>;
}
// A component that uses this reuseable component
// ...
function componentThatUsesReusableComponent() {
  return (
    <div>
      <ReuseableComponent someState={'this is some state'} />
      <ReuseableComponent
        someState={'this is some other state with the same state name'}
      />
    </div>
  );
}
```

And the `createSelector` function is used to compute `someState`, it will cause a re-render each time. The reason for this is that the `createSelector` function is the same function in both instances of the reuseable component. So, it is continually altering the state.

The way to prevent this from happening looks like this:

```js
const makeGetVisibleTodos = () => {
  return createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed);
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    }
  );
};
```

So that a new instance of `createSelector` is instantiated for each instance of the reuseable component.
