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
- **pure function** --> consistency and predictability
		- Pure functions always return the same result given the same arguments.
		- Pure function's execution doesn't depend on the state of the application.
		- Pure functions don't modify the variables outside of their scope. 
- React's render method needs to be a pure function and because it's a pure function, all of the benefits of pure functions now apply to your UI as well
- **PropTypes** allow you to declare the "type" (string, number, function, etc) of each prop being passed to a component
		- if a prop passed in isn't of the declared type, you'll get a warning in the console
		- to use PropTypes with functions the API is PropTypes.func
		- to use booleans, the API is PropTypes.bool
		- ALWAYS specify propType of each component you build!
- In JSX, anything written between {} is interpreted as literal JS
- Setting state with setState():
	- incorrect: ``` this.state.showComments = true; ```
	- correct: ``` this.setState({showComments: true}); ```
- **Binding** & _this_ keyword - 4 uses:
	- Implicit Binding
		- most common rule
		- when function is invoked, that's what _this_ keyword references
		- references what's to the left of the .
	- Explicit Binding
		- .apply - like .call on function, but JS parses automatically
			- both immediately invoke function
		- .bind - returns new function instead of invoking existing function
			- does not immediately invoke function, but creates new one to be called later
	- new Binding
		- when function is invoked with _new_ keyword, _this_ keyword inside function is bound to new object being constructed
	- window Binding
		- _this_ keyword defaults to window object
- **Stateless Functional Components**:
	- components with just a render method
	- a really great paradigm to get used to is separating your components into container components and presentational components, with presentational components optionally taking in some data and rendering a view
	- no _this_ keyword - removes ambiguity
	```
	class HelloWorld extends React.Component {
		render () {
			return (
				<div>Hello {this.props.name}</div>
			)
		}
	}
	ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))
	```
	- Refactored to use a stateless functional component:
	```
	function HelloWorld (props) {
		return (
			<div>Hello {props.name}</div>
		)
	}
	ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))
	```
- **Private Components**:
	```
	function FriendItem (props) {
		return <li>{props.friend}</li>
	}

	function FriendsList (props) {
		return (
			<h1>Friends:</h1>
			<ul>
				{props.friends.map((friend, index) => <FriendItem friend={friend} key={friend} />)}
			</ul>
		)
	}
	module.exports = FriendsList
	```
- The **Render** method in a React component needs to be a **pure function**. That means it needs to be stateless, it needs to not make any Ajax requests, etc. **It should just receive state and props and then render a UI.**
- **React Life Cycle Events**:
	- Lifecycle methods are special methods each component can have that allow us to hook into the views when specific conditions happen (i.e. when the component first renders or when the component gets updated with new data, etc). 
	- two categories:
		- 1) When a component gets mounted and unmounted to the DOM
		- 2) When a component receives new data
	- things you may need to do:
		- Establish some default props in our component
    - Set some initial state in our component
    - Make an Ajax request to fetch some data needed for this component
    - Set up any listeners (i.e. Websockets or Firebase listeners)
    - Remove any listeners you initially set up (when unmounted)
	- **defaultProps**:
		```
		class Loading extends React.Component {
			render () {
				...
			}
		}
		Loading.defaultProps = {
			text: 'Loading'
		}
		```
	- set initial state (using ES6 constructor property):
		```
		class Login extends React.Component {
			constructor (props) {
				super(props)
				this.state =  {
					email: '',
					password: ''
				}
			}
			render () {
				...
			}
		}
		```
		- to update, call _this.setState_ and pass in new properties
	- Make an Ajax request to fetch some data needed for this component using _componentDidMount_:
		```
		class FriendsList extends React.Component {
			componentDidMount () {
				return axios.get(this.props.url).then(this.props.callback)
			}
			render () {
				...
			}
		}
		```
	- Set up listeners using _componentDidMount_:
		```
		class FriendsList extends React.Component {
			componentDidMount () {
				ref.on('value', function (snapshot) {
					this.setState(function () {
						return {
							friends: snapshot.val()
						}
					})
				}.bind(this)
			}
			render () {
				...
			}
		}
		```
	- Remove any listeners you initially set up (when unmounted) using _componentWillUnmount_:
		```
		class FriendsList extends React.Component {
			componentWillUnmount () {
				ref.off()
			}
			render () {
				...
			}
		}
		```
	- **getDerivedStateFromProps**:
		```
		  static getDerivedStateFromProps(nextProps, prevState) {
				// The object you return from this function will
				// be merged with the current state.
			}
		```
- 


### General JS things I should probably already know

- console.time(...some code...) // other code // console.timeEng(...same code...)  -> to measure how long code execution takes
- Namespace: an object that groups and protects related data and methods in JavaScript files
- avoid _with_ and _eval_ - especially when reading JSON to avoid script injections
	- use JSON.parse!
- rounding decimals: numberParam.toFixed(2) (returns string) -> use parseFloat(numberParam.toFixed(2))
- indexOf method returns -1 if item not in array
	- can use array.indexOf >= 0 as conditional to test if array not empty
- ...varName: rest parameter - automatically becomes an array - must be last parameter in a function
- => arrow functions: lexical binding - bind to the scope of where they are defined, not where they are used
	- aFunction(arg1, (argument) => { // function });
- template strings: string literals allowing embedded expressions
	- let fullString = `${str1} ${str2}` --> str1 str2
- ```let settings = Object.assign({}, defaults, options);```
- for-of loop for arrays: ``` for (let name of names) { // do stuff }  ```
- refs: assign form values to properties on the component object
	- ``` <input placeholder="Name: " ref={(input) => this._author = input} /> ```
- Synthetic events: in order to ensure events have consistent properties across browsers, React wraps the browser's native events into synthetic events
	- use ```onSubmit``` in react to capture form submission events
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
	```
	class NewClass { 
		constructor(name, username, img) {
			this.name = name;
			this.username = username;
			this.img = img;
		} 
		render(){
			 // ...
			}
	}
	let instanceClass = new NewClass(name, username, imgurl);
	let instanceClass.render(); 
	class ChildClass extends NewClass {
		constructor(name, username, img) {
			super();  // must be called in first line of child classes
			// ...
		}
		// ...
	}
	```
- exporting functions or classes as modules: 
	```
	// flash-message.js:
	export function flashMessage(message){
		alert(message);
	}

	export default class ExportClass {
		// ...
	}

	// index.js:f
	import ExportClass from './flash-message.js';
	let flash = new ExportClass("a param");

	import flashMessage from './flash-message.js';    OR import * as flash from './flash-message.js';
	flashMessage("Hello");      OR flash.flashMessage("Hello");

	// constants.js:  // store app-wide constants in a single module to import across files
	export const A_CONST = 3;
	export const ANOTHER_CONST = 50;
	```
- Promises:
	- promise constructor function takes an anonymous function with two callback arguments (handlers):
	```
		function getResults(name) {
			return new Promise(function(resolve, reject){
				// ... do stuff
				resolve(someValue);
				// ...
				reject(someValue);
			});
		};
		// then tells function what to do after resolve -> chaining results
		getResults("some values").then(function(results){
			return results.filter((result) => result.city === "Orlando");
		})  // next function uses result of previous one 
		.then(function(results){
			ui.renderPage(results);
		})  // if reject, goes straight to catch
		.catch(function(error){
			console.log(error);
		});
	```
- Generators: 
	- \* : generator functions - special functions from which we can use the yield keyword to return iterator objects
	```
	function *nameList() {
		yield "name1";
		yield "name2";
	}
	for (let name of nameList()) {
		console.log(name);  // > name1, name 2
	}
	let names = [...nameList()];
	console.log(names);  // > ["name1", "name2"]

	let [first, second] = nameList();
	console.log(first, second);  // > name1 name2
	```
- Ternary Conditionals:
	- ```let result = someCondition ? pickThisIfTrue : pickThisIfFalse; ```
	- ```let result2 = someCondition && someOther ? pickThisIfTrue : pickThisIfFalse; ```
	- ```someCondition && someOther ? functionIfTrue(){...}() : functionIfFalse(){...}(); ```
	- ```someCondition ? (param1 = "some value", param2 = "another value") : (param1 = "this value", param2 = "that value"); ```
	- can be nested!
	- assignment with logical operators - or:
	``` 
		// if it exists, passed as it is - if it doesn't, assigned empty array
		function addProperty(property) {
			this.property = this.property ? this.property : [];
			// same thing:
			this.property = this.property || [];
			this.property.push(property);
		}
	```
	- assignment with logical operators - and:
	``` 
		// && will take the rightmost 'truthy' value or the first 'falsy' value
		result = undefined && 42;  // > will return 'undefined'
		result = "result 1" && "result 2";  // > will return 'result 2' - last 'truthy' value
		}
	```
- Switch block:
	```
	function Knight (name, choice) {
		this.name = name;
		this.choice = choice;
		switch(choice) {
			case 1:
				this.weapon = "sword";
				break;  // so loop broken once correct choice found
			case 2:
				this.weapon = "knife";
				break;
			...
			case "none":
				this.weapon = "none";
				break;
			default:  // what happens if none of the previous conditions met
				console.log("no weapon assigned
				");
		}
	}

	let soldier2 = new Knight("Richard", 2)  // -> soldier2.weapon returns "knife"
	```
- Loop optimization: 
	```
	// instead of for(let i = 0; i < someObj.someArray.length; i++){...}
	// do:
	let x = someObj.someArray.length;
	for(let i = 0; i < x; i++){...}
	// use 'cached values' to only get length once, not every time the loop runs
	// even better:
	let list = someObj.someArray;
	for(let i = 0, x = list.length; i < x; i++){...}
	```
- Exception handling:
	- exceptions are run-time errors
	- A syntax error is detected by the JavaScript parser before the program is ever executed, whereas a run-time error can be the result of trying to execute perfectly valid JavaScript
	- try/catch block:
		```
		try {
			do(something);
		} catch(error) {
			alert(something + " does not exist!");
		}
		// can do:
		catch(error) {
			if (error instanceof TypeError) {
				// ...
			}
			if (!something) {
				throw new Error ("Not found!");
			}
		}
		finally {
			// comes at end of try/catch block, always executed
		}
		```
- React Lifecycle methods:
	- functions that are called while the component is rendered for the first time or about to be removed from the DOM
	- functions that get called during certain phases that components go through
	- order:
		```
			constructor()
			componentWillMount()    // mounting = being rendered for the first time -> good time for AJAX requests
			render()
			componentDidMount()     // good place to fetch data from API that needs to be fetched periodically (using setInterval())
			componentWillUnmount()  // unmounting = being removed from the DOM -> remember to clearInterval() here if set
		```
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
- props are arguments passed to components

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
		const topics = ["React", "JSX", "JavaScript", "Programming"];
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
				<!-- another way to use map() in JSX: -->
				<ul>
					{topics.map( () => <li>{topics}</li> )}
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
```
class Badge extends React.Component {
	render() {
		return (
			<div>
				<img
					scr={this.props.img}
					alt='Avatar'
					style={{width: 100, height:100}} 
				/>
				<h1>Name: {this.props.name}</h1>
				<h3>username: {this.props.username}</h3>
			</div>
		)
	}
}

Badge.propTypes = {
	img: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
}


ReactDOM.render(
	<Badge 
		name = "Tyler McGinnis"
		username = "tylermcginnis"
		img = {"https://avatars0.githubusercontent.com/u/2933430?v=3&s=460"}
	/>,
	document.getElementById('root')
)


```

```
class CommentBox extends React.Component {
	constructor() {
		super();

		this.state = {
			showComments: false,
			comments: []   // populated by AJAX!
		};
	}

	componentWillMount() {  // so comments fetched before render
		this._fetchComments();
	}

	render() {
		const comments = this._getComments();
		return(
			<div className="comment-box">
				<CommentForm addComment={this._addComment.bind(this)} />
				<CommentAvatarList avatars={this._getAvatars()} />
				{this._getPopularMessage(comments.length)}
				<h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
				<div className="comment-list">
					{comments}
				</div>
			</div>
		);
	}

	_getComments() {

		return commentList.map((comment) => {
			return (<Comment
							 author={comment.author}
							 body={comment.body}
							 avatarUrl={comment.avatarUrl}
							 onDelete={this._deleteComment.bind(this)}  // use bind(this) so React knows which comment to delete!
							 key={comment.id}    // remember to use a unique key!
							 />);
		});
	}

	_getAvatars() {
		return this.state.comments.map((comment) => comment.avatarUrl);
	}

	_getPopularMessage(commentCount) {
		const POPULAR_COUNT = 10;
		if (commentCount > POPULAR_COUNT) {
			 return (
				 <div>This post is getting really popular, don't miss out!</div>
			 );
		}
	}

	_getCommentsTitle(commentCount) {  // for proper grammar!
		if (commentCount === 0) {
			return 'No comments yet';
		} else if (commentCount === 1) {
			return '1 comment';
		} else {
			return `${commentCount} comments`;
		}
	}

	_addComment(commentAuthor, commentBody) {
		let comment = {
			id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
			author: commentAuthor,
			body: commentBody
		};
		
		this.setState({
			comments: this.state.comments.concat([comment])  // concat() faster than push() for rendering!
		});
	}

	_fetchComments() {
		$.ajax({
			method: 'GET',
			url: 'comments.json',
			success: (comments) => {
				this.setState({ comments });
			}
		});
	}

}

class Comment extends React.Component {
	constructor() {
		super();
		this.state = {
			isAbusive: false
		};
	}

	render() {
		let commentBody;

		if (!this.state.isAbusive) {
			commentBody = this.props.body;
		} else {
			commentBody = <em>Content marked as abusive</em>;
		}

		return(
			<div className="comment">
				
				<img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />

				<p className="comment-header">{this.props.author}</p>
				<p className="comment-body">`
					{commentBody}
				</p>
				<div className="comment-actions">
					<RemoveCommentConfirmation onDelete={this._handleDelete.bind(this)} />  // to show a confirmation before deleting a comment
					<a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>  // use bind to bind event! Otherwise on event handlers won't work!
				</div>
			</div>
		);
	}

	_toggleAbuse(event) {
	event.preventDefault();
	this.setState({
		isAbusive: !this.state.isAbusive
		});
	}

	_handleDelete() {
			this.props.onDelete(this.props.id);
		}
	}

}

class RemoveCommentConfirmation extends React.Component {
	constructor() {
		super();
		
		this.state = {
			showConfirm: false
		};
	}
	
	render() {
		let confirmNode;
		if (this.state.showConfirm) {
			return (
				<span>
					<a href="" onClick={this._confirmDelete.bind(this)}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage.bind(this)}> No</a>
				</span>
			);
		} else {
			confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>Delete comment?</a>;
		}
		return (
			<span>{confirmNode}</span>
		);
	}
	
	_toggleConfirmMessage(e) {
		e.preventDefault();
		
		this.setState({
			showConfirm: !this.state.showConfirm
		});
	}
	
	_confirmDelete(e) {
		e.preventDefault();
		
		this.props.onDelete(e);
		
	}
}

class CommentForm extends React.Component {
	constructor() {
		super();
		this.state = {
			characters: 0
		};
	}

	render() {
		return (
			<form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
				<label>New comment</label>
				<div className="comment-form-fields">
					<input placeholder="Name:" ref={input => this._author = input} />
					<textarea
						placeholder="Comment:"
						ref={textarea => this._body = textarea}
						onKeyUp={this._getCharacterCount.bind(this)}
						></textarea>
				</div>
				<p>{this.state.characters} characters</p>
				<div className="comment-form-actions">
					<button type="submit">
						Post comment
					</button>
				</div>
			</form>
		);
	}

	_handleSubmit(event) {
		event.preventDefault();
		if (!this._author.value || !this._body.value) {
			alert("Please enter your name and comment");
			return;  // return to prevent adding
		}
		this.props.addComment(this._author.value, this._body.value);  // consolidate for cleaner code!
		
		this._author.value = '';
		this._body.value = '';
		
		this.setState({ characters: 0  });
	}

}

```
**Using lifecycle hooks:**
```
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Tyler McGinnis'
    }
  }
  componentDidMount(){
    // Invoked once the component is mounted to the DOM
    // Good for making AJAX requests
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // The object you return from this function will
    // be merged with the current state.
  }
  componentWillUnmount(){
    // Called IMMEDIATELY before a component is unmounted
    // Good for cleaning up listeners
  }
  render() {
    return ...
  }
}
```