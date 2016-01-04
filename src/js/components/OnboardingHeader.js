var Container = require('react-container');
var React = require('react');

module.exports = React.createClass({
	getInitialState () {
		return {};
	},
	render () {
		return (
			<Container align="center" justify="center" direction="column" className="onboarding-header">
				<img src="./img/tradeshift-logo.svg" className="onboarding-logo" />
				<div className="onboarding-heading onboarding-heading-1"><strong>Tradeshift</strong><br />Global Team Camp</div>
				<div className="onboarding-heading onboarding-heading-2">January 11 &mdash; 16<br /><em>Barcelona, Spain</em></div>
				<br />
				<br />
				<div className="animation-fade-enter">
					<div className="onboarding-heading onboarding-heading-1 ">Welcome!</div>
					<div className="onboarding-heading onboarding-heading-1">¡Bienvenido!</div>
				</div>
			</Container>
		);
	}
});

