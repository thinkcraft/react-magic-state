# React Magic State 

[![Version](https://img.shields.io/npm/v/react-magic-state.svg)](https://www.npmjs.com/package/react-magic-state)
[![License](https://img.shields.io/github/license/thinkcraft/react-magic-state)](https://github.com/thinkcraft/react-magic-state/blob/master/LICENSE)

React state management without the hassle.

## Introduction

React Magic State was created with simplicity and efficiency in mind. Its tiny API, comprised of just two methods, is enough to express all possible reactive state-component relationships.

The way React Magic State works is by wrapping your store(s) with ES6 proxies, and using them to keep track of every property that is accessed by your React components. Whenever an observed property changes, the relevant components are re-rendered by updating their internal state.

The use of ES6 proxies means that only current browsers are supported. This means no Internet Explorer support, sorry.

## Installation

```
npm install --save react-magic-state
```

## API

### useStore()

Simply wrap your store(s) with `useStore()`:

```js
const store = useStore({
    foo: 42
});
```

### useStore() hook

Inside function components, you can call `useStore()` to track local state:

```jsx
const Hello = view(function Hello() {
    const store = useStore({
        name: "World"
    });

    return <h1>Hello {store.name}!</h1>
});
```

### view()

Wrap your components with `view()` to track store(s) and react to changes:

```jsx
const Hello = view(class Hello extends React.PureComponent {
    render() {
        ...
    }
});
```


You can also use `view()` as a decorator with Babel or TypeScript:

```jsx
@view
class Hello extends React.Component {
    render() {
        ...
    }
}
```