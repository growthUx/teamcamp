var Container = require('react-container');
var React = require('react');

module.exports = React.createClass({
	getInitialState () {
		return {};
	},
	render () {
		return (
			<Container align="center" justify="center" direction="column" className="onboarding-header">
				<img src="./img/front_badge.svg" className="onboarding-logo" />
				<div className="onboarding-heading onboarding-heading-1"><strong>TRADESHIFT</strong><br />Global Team Camp</div>
				<div className="onboarding-heading onboarding-heading-2">January 10 - 16, 2016</div>
				<br />
				<div className="animation-fade-enter">
					<div className="onboarding-heading onboarding-heading-1">Welcome!</div>
					<div className="onboarding-heading onboarding-heading-1">¡Bienvenido!</div>
				</div>
			</Container>
		);
	}
});

