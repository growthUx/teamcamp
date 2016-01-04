var animation = require('../touchstone/animation');
var Container = require('react-container');
var React = require('react');
var Tappable = require('react-tappable');

const scrollable = Container.initScrollable();

module.exports = React.createClass({
	displayName: 'ViewAbout',
	contextTypes: { dataStore: React.PropTypes.object.isRequired },
	mixins: [animation.Mixins.ScrollContainerToTop],

	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				title: 'About'
			}
		}
	},

	getDefaultProps () {
		return {
			aboutButtonLink: 'http://thinkmill.com.au/',
			aboutButtonLabel: 'Learn More'
		}
	},

	handleButton () {
		window.open(this.props.aboutButtonLink, '_blank', 'toolbar=yes,location=no,transitionstyle=coververtical');
	},

	render () {
		var settings = this.context.dataStore.getSettings()

		return (
			<Container scrollable={scrollable} className="About" ref="scrollContainer">
				<div className="About-section">
					<img src="./img/tradeshift-logo.svg" className="About__logo" />
					<div className="About__heading">Tradeshift GTC 2016</div>
					<div className="About__subheading">Place resources on this page.</div>
				</div>
				
			</Container>
		);
	}
});

