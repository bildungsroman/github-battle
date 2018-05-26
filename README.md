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
- instead of composing functions to get some value, compose functions to get some UI
- pure function --> consistency and predictability
    - Pure functions always return the same result given the same arguments.
    - Pure function's execution doesn't depend on the state of the application.
    - Pure functions don't modify the variables outside of their scope. 
- React's render method needs to be a pure function and because it's a pure function, all of the benefits of pure functions now apply to your UI as well
- PropTypes allow you to declare the "type" (string, number, function, etc) of each prop being passed to a component
    - if a prop passed in isn't of the declared type, you'll get a warning in the console
    - to use PropTypes with functions the API is PropTypes.func
    - to use booleans, the API is PropTypes.bool
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

### Basic use of props

```
class HelloUser extends React.Component {
  render() {
    return (
      <div> Hello, {this.props.name}</div>
    )
  }
}
ReactDOM.render(<HelloUser name="Tyler"/>, document.getElementById('app'));
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

## More code examples from tutorials
```
class Users extends React.Component {
  render() {
      <!-- This is where JS logic goes! before the return -->
    let friends = this.props.list.filter(function(user){
                return user.friend === true
    })
    let nonfriends = this.props.list.filter(function(user){
              return user.friend !== true;
            })
    return (
      <div>
        <h1>Friends</h1>
        <ul> 
           { /*Create an <li> for every name in the list array who is also your friend*/
            friends.map(function(user){
                return <li key={user.name}>{user.name}</li>  <!-- React requires unique keys! -->
              })
           }
        </ul>
        
        <hr />
        
        <h1> Non Friends </h1>
        <ul>
          {/*Create an <li> for every name in the list array who is NOT your friend*/
          nonfriends.map(function(user){
              return <li key={user.name}>{user.name}</li>  <!-- React requires unique keys! -->
            })
          }
        </ul>        
      </div>
    )
  }
}
```