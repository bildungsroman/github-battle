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
- you should treat props to a component as immutable
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
    - ALWAYS specify propType of each component you build!
- 

### General JS things I should probably already know

- ...varName: rest parameter - automatically becomes an array - must be last parameter in a function
- => arrow functions: lexical binding - bind to the scope of where they are defined, not where they are used
  - aFunction(arg1, (argument) => { // function });
- template strings: string literals allowing embedded expressions
  - let fullString = `${str1} ${str2}` --> str1 str2
- ```let settings = Object.assign({}, defaults, options);```
- for-of loop for arrays: ``` for (let name of names) { // do stuff }  ```
- Array.find: ```let admin = users.find( user => user.admin ); ``` --> returns first true value (not all true values like Array.filter)
- Maps: like objects - key/value data structure - any value can be key or value, & numbers not converted to strings
  - use get() & set() methods to access values in maps
  - ``` let newMap = new Map(); \ newMap.set( user1, 5); \ newMap.get(user1); ==> 5 ```
  - can be used with for...of loops, unlike objects
  - can have WeakMap() -> takes only objects
- Sets: like arrays - store unique values of any type (like python dicts)
  - use add() & 
  - ``` let newSet = new Set();  \ newSet.add("value"); \ newSet.size ==> 1```
  - set objects are iterable - can be used w/ for...of loops - ``` for(let set of newSet) {};  ```
  - can have WeakSet() -> takes only objects
- Classes:
  - ``` class NewClass {``` 
  - ```   constructor(name, username, img) {``` 
  - ```     this.name = name;``` 
  - ```     this.username = username;``` 
  - ```     this.img = img;``` 
  - ```   } ``` 
  -   ``` render(){``` 
  -   ```   // ...``` 
  -   ``` }``` 
  - ``` } ```
  - ``` let instanceClass = new NewClass(name, username, imgurl); ```
  - ``` instanceClass.render(); ```
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