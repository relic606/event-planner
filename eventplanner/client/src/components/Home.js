import React from "react";
import AddEvent from "./AddEvent";
import AddContact from "./AddContact";
import FutureEvents from "./FutureEvents";

export default class Home extends React.Component {
	state = {
		seenContact: false,
		seenEvent: false
	};
	togglePopEvent = () => {
		if (this.state.seenContact !== true) {
			this.setState({
				seenEvent: !this.state.seenEvent
			});
		}
	};
	togglePopContact = () => {
		if (this.state.seenEvent !== true) {
			this.setState({
				seenContact: !this.state.seenContact
			});
		}
	};
	render() {
		return (
			<div>
				<div className="add-buttons-container">
					<div>
						<button onClick={this.togglePopEvent}>Add Event</button>
					</div>
					{this.state.seenEvent ? (
						<AddEvent toggle={this.togglePopEvent} />
					) : null}

					<div>
						<button onClick={this.togglePopContact}>Add Contact</button>
					</div>

					{this.state.seenContact ? (
						<AddContact toggle={this.togglePopContact} />
					) : null}
				</div>
				<div className="future-events-container">
					<FutureEvents />
				</div>
			</div>
		);
	}
}
