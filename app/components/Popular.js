const React = require('react');


class Popular extends React.Component {
	render() {
		const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python'];

		return (
			<ul className="languages">
				{language.map(function(lang) {
					return (
						<li>
							{lang}
						</li>
					)
				})}
			</ul>
		)
	}
}

module.exports = Popular;