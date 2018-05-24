# Github Battle

## A tutorial project to learn React

Learning React JS fundamentals while following along with [Tyler McGinnis' React tutorials](https://learn.tylermcginnis.com/).

## React notes (just for my brain)

- props are to components what arguments are to functions
- webpack, at its core, is a code bundler
- babel translates JSX
- separation of concerns - mix JS and HTML as part of one app
- react component: a collection of HTML, CSS, JS, and some internal data specific to that component
- React components === Kolaches of the web. They have everything you need, wrapped in a delicious composable bundle
- 

## Basic React component

```
const React = require('react');
const ReactDOM = require('react-dom');
class HelloWorld extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    )
  }
}
ReactDOM.render(<HelloWorld />, document.getElementById('app'));
```

## Imperative vs. declarative

### Imperative approaches:
```
function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}
```
```
function add (arr) {
  let result = 0
  for (let i = 0; i < arr.length; i++){
    result += arr[i]
  }
  return result
}
```
```
$("#btn").click(function() {
  $(this).toggleClass("highlight")
  $(this).text() === 'Add Highlight'
    ? $(this).text('Remove Highlight')
    : $(this).text('Add Highlight')
})
```

### Declarative approaches:
```
function double (arr) {
  return arr.map((item) => item * 2)
}
```
```
function add (arr) {
  return arr.reduce((prev, current) => prev + current, 0)
}
```
```
<Btn
  onToggleHighlight={this.handleToggleHighlight}
  highlight={this.state.highlight}>
    {this.state.buttonText}
</Btn>
```