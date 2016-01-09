var Container = require('react-container');
var Sentry = require('react-sentry');
var OnboardingHeader = require('../../components/OnboardingHeader');
var React = require('react/addons');
var Scanner = require('../../components/Scanner');
var Tappable = require('react-tappable');
var Transition = React.addons.CSSTransitionGroup;
var { Link, Transitions } = require('../../touchstone');

var classnames = require('classnames');
var icons = require('../../icons');

var OnboardingView = React.createClass({
	mixins: [Sentry(), Transitions],
	// contextTypes: { dataStore: React.PropTypes.object.isRequired },

	getInitialState () {
		// var showResendEmail = this.context.dataStore.getSettings().showResendEmail;
		return {
			online: window.navigator.onLine,
			scanning: false,
			// showResendEmail: showResendEmail,
			valid: false
		};
	},

	componentDidMount () {
		this.watch(window, 'online', this.updateOnlineStatus);
		this.watch(window, 'offline', this.updateOnlineStatus);
	},

	render () {
		return (
			<Container direction="column">
				<OnboardingHeader />
				<Container justify align="center" direction="row" className="onboarding-footer">
					<Link to="app:main" transition="fade" className="onboarding-footer__button">Proceed to Team Camp Info</Link>
				</Container>
			</Container>
		);
	}
});

export default OnboardingView;
