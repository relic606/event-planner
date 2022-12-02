import React, { useState, useEffect } from "react";
import axios from "axios";

const PastEvents = () => {
	const [eventList, setEventList] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:8000/pastevents")
			.then((res) => {
				setEventList(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	const updateNotes = (event) => {
		const eventID = Number(event.target.parentNode.id);
		const eventNotes = event.target.previousSibling.value;

		const updateNotesObj = {
			eventID: eventID,
			eventNotes: eventNotes
		};

		axios
			.put("http://localhost:8000/pastevents", updateNotesObj)
			.then((res) => {
				if (res) {
					window.location.reload();
				}
			})
			.catch((err) => console.log(err));
	};
	const displayPastEventList = eventList.map((eventList) => {
		return (
			<div
				key={eventList.event_id}
				className="past-event-details"
				id={eventList.event_id}
			>
				<h3>{eventList.event_name}</h3>
				<p>{eventList.event_date}</p>
				<textarea
					className="past-event-notes"
					defaultValue={eventList.notes}
				></textarea>
				<button onClick={updateNotes}>Update Notes</button>
			</div>
		);
	});
	return <div className="past-events-container">{displayPastEventList}</div>;
};

export default PastEvents;
