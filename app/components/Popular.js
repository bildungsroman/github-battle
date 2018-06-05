const React = require('react');


class Popular extends React.Component {
	constructor (props) {
		super(props);  // constructors have to have this!
		this.state = {
			selectedLanguage: 'All',
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);  // this keyword not defined until invoked
		// bind property takes in context and binds this to that context
	}

	updateLanguage(lang) {
		this.setState(function(){
			return {
				selectedLanguage: lang
			};
		});
	}

	render() {
		const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

		return (
			<ul className='languages'>
				{/* <p>Selected Language: {this.state.selectedLanguage}</p>  // checks state! */}
				{languages.map((lang) => {
					console.log(this);
					return (
						<li 
						style={lang === this.state.selectedLanguage ? {color:'#d0021b'} : null}
						onClick={this.updateLanguage.bind(null, lang)}
						key={lang}>
						{lang}
						</li>
					)
				})}
			</ul>
		)
	}
}

module.exports = Popular;