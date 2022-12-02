import axios from "axios";
import React, { Component } from "react";
import ContactCheckbox from "../components/ContactCheckbox";

export default class AddEvent extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);

		this.eventName = React.createRef();
		this.date = React.createRef();
		this.signUpItems = React.createRef();
	}
	handleClickEvent = () => {
		this.props.toggle();
	};
	submit = (event) => {
		const checkboxNodeList =
			event.target.childNodes[1].querySelectorAll(".contact-checkbox");

		console.log(checkboxNodeList);

		const attendeeArr = [];
		for (let i = 0; i < checkboxNodeList.length; i++) {
			if (checkboxNodeList[i].checked) {
				attendeeArr.push(Number(checkboxNodeList[i].id));
			}
		}

		const signUpItemsArr = this.signUpItems.current.value
			.replace("'", "")
			.split(", ");

		const eventObj = {
			eventName: this.eventName.current.value.replace("'", ""),
			date: this.date.current.value,
			// signUpItems: this.signUpItems.current.value,
			signUpItemsArr: signUpItemsArr,
			attendeeArr: attendeeArr
		};
		if (
			!eventObj.eventName ||
			!eventObj.date ||
			eventObj.signUpItemsArr.length === 0 ||
			eventObj.signUpItemsArr[0] === "" ||
			eventObj.attendeeArr.length === 0
		) {
			alert("Please Complete Each Field");
			console.log(eventObj.date);
		} else {
			axios
				.post("http://localhost:8000/addevent", eventObj)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
			this.props.toggle();
			window.location.reload();
		}
		event.preventDefault();
	};

	//********************
	//Add event button depends on the below html structure to submit.  May need to modify CheckboxNodeList
	//in submit method above if modified
	//******************** */

	render() {
		return (
			<div className="add-event">
				<div className="add-event-content">
					<div className="close-event" onClick={this.handleClickEvent}>
						&times;{" "}
					</div>
					<form className="add-event-form" onSubmit={this.submit}>
						<div className="add-event-left">
							<div className="add-event-top-left">
								<input
									type="text"
									ref={this.eventName}
									placeholder="Event Name"
								/>
								<input
									type="datetime-local"
									ref={this.date}
									placeholder="Date"
								/>
							</div>
							<textarea
								className="add-event-textarea"
								ref={this.signUpItems}
								placeholder="Items needed"
							/>
						</div>
						<div className="add-event-right">
							<h3>Attendees</h3>
							<ContactCheckbox />
							<input
								type="submit"
								value="Add Event"
								className="add-event-btn"
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
