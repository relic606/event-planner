import axios from "axios";
import React, { Component } from "react";

export default class AddContact extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);

		this.name = React.createRef();
		this.email = React.createRef();
		this.phone = React.createRef();
	}
	handleClickContact = () => {
		this.props.toggle();
	};
	submit = (event) => {
		const contactObj = {
			name: `${this.name.current.value}`,
			email: `${this.email.current.value}`,
			phone: `${this.phone.current.value}`
		};
		if (!contactObj.name || !contactObj.email || !contactObj.phone) {
			alert("Each field must be completed!");
		} else {
			axios
				.post("http://localhost:8000/", contactObj)
				.then(() => {
					alert("Contact Added Successfully");
				})
				.catch((err) => {
					alert("Error Adding Contact");
					console.log(err);
				});
			this.props.toggle();
		}
		event.preventDefault();
	};
	render() {
		return (
			<div className="add-contact">
				<div className="add-contact-content">
					<div className="close-contact" onClick={this.handleClickContact}>
						&times;{" "}
					</div>
					<form onSubmit={this.submit}>
						<input type="text" ref={this.name} placeholder="Name" />
						<input type="email" ref={this.email} placeholder="Email" />
						<input type="phone " ref={this.phone} placeholder="Phone Number" />
						<input
							type="submit"
							value="Add Contact"
							className="add-contact-btn"
						/>
					</form>
				</div>
			</div>
		);
	}
}
