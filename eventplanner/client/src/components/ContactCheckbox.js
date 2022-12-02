import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContactCheckbox() {
	const [contactList, setContactList] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:8000/contacts")
			.then((res) => {
				setContactList(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	const displayContactList = contactList.map((contactList) => {
		return (
			<div key={contactList.contact_id}>
				<input
					type="checkbox"
					className="contact-checkbox"
					id={contactList.contact_id}
					value={contactList.contact_name}
				/>
				<label htmlFor={contactList.contact_id}>
					{contactList.contact_name}
				</label>
			</div>
		);
	});
	return <div id="checkbox-container">{displayContactList}</div>;
}
