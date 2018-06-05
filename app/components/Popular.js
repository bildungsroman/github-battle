import React from "react";
import PropTypes from 'prop-types';
const api = require('../utils/api');

// react app elements:
// state
// lifecycle events
// ui


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

function RepoGrid(props) {
	return (
		<ul className='popular-list'>
			{props.repos.map(function(repo, index) {
				return (
					<li key={repo.name} className='popular-item'>
					<div className='popular-rank'>#{index + 1}</div>
					<ul className='space-list-items'>
						<li>
							<img
								className='avatar img-responsive'
								src={repo.owner.avatar_url}
								alt={'Avatar for ' + repo.owner.login}
							/>
						</li>
						<li><a href={repo.html_url}>{repo.name}</a></li>
						<li>@{repo.owner.login}</li>
						<li>{repo.stargazers_count} stars</li>
					</ul>
				</li>
				)
			})}
		</ul>
	)
}


// proptypes crashing app!
// SelectLanguage.propTypes = {
// 	selectedLanguage: PropTypes.string.isRequired,
// 	onSelect: PropTypes.function.isRequired,
// };
// RepoGrid.propTypes = {
// 	repos: PropTypes.array.isRequired,
// };


class Popular extends React.Component {
	constructor (props) {
		super();  // constructors have to have this!
		this.state = {
			selectedLanguage: 'All',
			repos: null,
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);  // this keyword not defined until invoked
		// bind property takes in context and binds this to that context
	}

	componentDidMount() {
		// AJAX goes here!
		this.updateLanguage(this.state.selectedLanguage);
	}
	

	updateLanguage(lang) {
		this.setState(function(){
			return {
				selectedLanguage: lang,
				repos: null,
			}
		});
		
		api.fetchPopularRepos(lang)
			.then(function (repos) {
				this.setState(function(){
					return {
						repos: repos
					}
				})
			}.bind(this));  // bind to get right this!
	}

	render() {
		return (
			<div>
				<SelectLanguage  // stateless functional component
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} 
				/>
				{/* {JSON.stringify(this.state.repos, null, 2)}   // to see objects in HTML */}
				{!this.state.repos  		// if falsey (null)
					? <p>LOADING...</p>		// show as loading, otherwise: 
					: <RepoGrid repos={this.state.repos} /> }
			</div>
		)
	}
}

module.exports = Popular;
