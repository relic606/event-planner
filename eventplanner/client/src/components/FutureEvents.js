import React, { useState, useEffect } from "react";
import axios from "axios";
import EventDetails from "./EventDetails";
import { Link } from "react-router-dom";

export default function FutureEvents() {
	const [eventList, setEventList] = useState([]);
	const [error, setError] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:8000/")
			.then((res) => {
				if (res.data) {
					setEventList(res.data);
				}
			})
			.catch((err) => setError(err));
	}, []);

	const displayEventDetails = () => {
		for (let i = 0; i < eventList.length; i++) {
			return <EventDetails />;
		}
	};
	const displayFutureEventList = eventList.map((eventList) => {
		return (
			<div key={eventList.event_id} className="future-event-list-item">
				<Link to={`event/${eventList.event_id}`} onClick={displayEventDetails}>
					<h2>{eventList.event_name}</h2> <p>{eventList.event_date}</p>
				</Link>
			</div>
		);
	});
	if (eventList.length === 0 && error.length === 0) {
		return (
			<div>
				<h2>Upcoming Events </h2>
				<p>Loading...</p>

				<div className="dog-container"></div>
			</div>
		);
	} else if (error.length !== 0) {
		return (
			<div>
				<h2>Upcoming Events</h2>
				<p>Error Loading Events</p>

				<div className="dog-container"></div>
			</div>
		);
	} else {
		return (
			<div>
				<h2>Upcoming Events</h2>
				{displayFutureEventList}
			</div>
		);
	}
}
