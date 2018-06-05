const React = require('react');
import PropTypes from 'prop-types';


function SelectLanguage (props) {  // turn classes that only have render method into functions!
	let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return [
		<ul className='languages'>
		{/* <p>Selected Language: {this.state.selectedLanguage}</p>  // checks state! */}
		{languages.map((lang) => {  // the ES6 way to do this!
			console.log(this);
			return (
				<li 
					style={lang === props.selectedLanguage ? {color:'#d0021b'} : null}
					onClick={props.onSelect.bind(null, lang)}
					key={lang}>
						{lang}
				</li>
				)
			})}
		</ul>,
		<p>Selected Language: {props.selectedLanguage}</p>
	]
}


// proptypes crashing app!
// SelectLanguage.propTypes = {
// 	selectedLanguage: PropTypes.string.isRequired,
// 	onSelect: PropTypes.function.isRequired,
// };


class Popular extends React.Component {
	constructor (props) {
		super();  // constructors have to have this!
		this.state = {
			selectedLanguage: 'All',
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);  // this keyword not defined until invoked
		// bind property takes in context and binds this to that context
	}

	updateLanguage(lang) {
		this.setState(function(){
			return {
				selectedLanguage: lang,
			};
		});
	}

	render() {
		return (
			<div>
				<SelectLanguage  // stateless functional component
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} 
				/>
			</div>
		)
	}
}

module.exports = Popular;