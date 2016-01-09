var animation = require('../../touchstone/animation');
var Container = require('react-container');
var Sentry = require('react-sentry');
var React = require('react');
var Timers = require('react-timers');

var ListHeader = require('../../components/ListHeader');
var ScheduleItem = require('./item');

var moment = require('moment');
const scrollable = Container.initScrollable();

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

module.exports = React.createClass({
	displayName: 'Agenda',
	contextTypes: {
		dataStore: React.PropTypes.object.isRequired
	},
	mixins: [Sentry(), Timers(), animation.Mixins.ScrollContainerToTop],

	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				leftIcon: 'ion-android-menu',
				leftAction: emitter.emit.bind(emitter, 'navigationBarLeftAction'),
				title: 'Agenda'
			}
		}
	},

	getInitialState () {
		return {
			schedule: this.context.dataStore.getSchedule(),
			searchString: '',
			timeNow: window.timeNow || Date.now()
		}
	},

	componentDidMount () {
		var body = document.getElementsByTagName('body')[0];
		var menuWrapper = document.getElementsByClassName('Tabs-Navigator-wrapper')[0];
		body.classList.remove('android-menu-is-open');
		menuWrapper.addEventListener('click', function(e) {
			body.classList.remove('android-menu-is-open');
		});

		// navbar actions
		this.watch(emitter, 'navigationBarLeftAction', function () {
			body.classList.toggle('android-menu-is-open');
		});

		// watch the local store and update when the schedule changes
		this.watch(this.context.dataStore, 'update-schedule', this.updateScheduleState);

		// hard-update every minute to update "on now" indicator for talks
		this.setInterval(() => {
			// FIXME: remove, window.timeNow is for debugging
			this.setState({ timeNow: window.timeNow || Date.now() })
		}, 60 * 1000)
	},

	updateScheduleState () {
		this.setState({
			schedule: this.context.dataStore.getSchedule()
		});
	},

	render () {
		var days = [];
		var currentDay;
		var timeNow = this.state.timeNow;

		this.state.schedule.forEach(function (scheduleItem, i) {
			var itemDayName = moment(scheduleItem.startTime).utcOffset('+0200').format('dddd');

			if (!currentDay || currentDay.name !== itemDayName) {
				currentDay = { name: itemDayName, items: [] };
				days.push(currentDay);
			}

			var begun = timeNow > new Date(scheduleItem.startTime).getTime();
			var finished = timeNow > new Date(scheduleItem.endTime).getTime();
			var onNow = begun && !finished;

			// note: real-time integration is disabled now the event is over

			currentDay.items.push({
				details: scheduleItem,
				begun: false, // begun,
				finished: false, // finished,
				onNow: false // onNow
			});
		});

		return (
			<Container scrollable={scrollable} ref="scrollContainer">
				<div className="ListHeader-Wrapper">
					<div className="ListHeader ListHeader--sticky">Sunday - January 10, 2016</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 AM - 11:00 AM</div>
							<div className="ListItem__heading ScheduleItem__heading">Breakfast</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">11:00 AM - 10:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Leadership Camp</div>
						</div>
					</div>
				</div>
				<div className="ListHeader-Wrapper">
					<div className="ListHeader ListHeader--sticky">Monday - January 11, 2016</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 AM - 9:00 AM</div>
							<div className="ListItem__heading ScheduleItem__heading">Breakfast</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 AM - 12:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Leadership Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">12:00 PM - 1:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Lunch</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">1:00 PM - 4:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Leadership Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">4:00 PM - 4:30 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Break</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">4:30 PM - 8:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Leadership Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">8:00 PM - 11:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">New Hires and<br />Veteran Dinner</div>
						</div>
					</div>
				</div>
				<div className="ListHeader-Wrapper">
					<div className="ListHeader ListHeader--sticky">Tuesday - January 12, 2016</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 AM - 9:00 AM</div>
							<div className="ListItem__heading ScheduleItem__heading">Breakfast</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 AM - 12:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Team Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">12:00 PM - 1:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Lunch</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">1:00 PM - 4:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Team Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">4:00 PM - 4:30 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Break</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">4:30 PM - 7:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Team Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 PM - 9:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Dinner</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 PM - Midnight</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Team Camp</div>
						</div>
					</div>
				</div>
				<div className="ListHeader-Wrapper">
					<div className="ListHeader ListHeader--sticky">Wednesday - January 13, 2016</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 AM - 9:00 AM</div>
							<div className="ListItem__heading ScheduleItem__heading">Breakfast</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 AM - 11:00 AM</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Team Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">11:00 AM - 2:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Soccer/Football Game</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">2:00 PM - 7:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Team Camp</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 PM - 9:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Global Dinner</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 PM - ?</div>
							<div className="ListItem__heading ScheduleItem__heading ListItem--party">Party!</div>
						</div>
					</div>
				</div>
				<div className="ListHeader-Wrapper">
					<div className="ListHeader ListHeader--sticky">Thursday - January 14, 2016</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 AM - 7:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Department Camp<br />Hackathon</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 PM - 9:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">Department Dinner</div>
						</div>
					</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">9:00 PM - Midnight</div>
							<div className="ListItem__heading ScheduleItem__heading">Department Camp<br />Hackathon (cont.)</div>
						</div>
					</div>
				</div>
				<div className="ListHeader-Wrapper">
					<div className="ListHeader ListHeader--sticky">Friday - January 15, 2016</div>
					<div className="Tappable-inactive ListItem ScheduleItem ScheduleItem--other">
						<div className="ListItem__content ScheduleItem__content">
							<div className="ListItem__text ScheduleItem__text">7:00 AM - 11:00 PM</div>
							<div className="ListItem__heading ScheduleItem__heading">BSG Camp<br />Hackathon</div>
						</div>
					</div>
				</div>
			</Container>
		);
	}
});
