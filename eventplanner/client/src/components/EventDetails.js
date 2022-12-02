import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EventDetails() {
	const [eventID, setEventId] = useState("");
	const [eventInfo, setEventInfo] = useState([]);
	const [signupList, setSignupList] = useState([]);
	const [attendeeList, setAttendeeList] = useState([]);
	const [errorObj, setErrorObj] = useState({});

	useEffect(() => {
		const geteventIDFromParams = () => {
			const urlEventID = window.location.pathname.substring(7);
			setEventId(urlEventID);
		};
		const getRepos = async () => {
			geteventIDFromParams();
			try {
				const res1 = await axios.get(`http://localhost:8000/event/${eventID}`);
				const res2 = await axios.get(`http://localhost:8000/signup/${eventID}`);
				const res3 = await axios.get(
					`http://localhost:8000/attendees/${eventID}`
				);

				const myEventRepo = res1.data;
				const mySignupRepo = res2.data;
				const myAttendeeRepo = res3.data;

				setEventInfo(myEventRepo);
				setSignupList(mySignupRepo);
				setAttendeeList(myAttendeeRepo);
			} catch (err) {
				console.log(err);
			}
		};
		getRepos();
	}, [eventID]);
	const displayEvent = eventInfo.map((eventInfo) => {
		return (
			<div key={eventInfo.event_id} className="event-name-date-container">
				<h3>{eventInfo.event_name}</h3>
				<h4>{eventInfo.event_date}</h4>
				<p>Time: {eventInfo.event_time}</p>
			</div>
		);
	});

	const signupAttendeeSelector = attendeeList.map((attendee) => {
		return (
			<option key={attendee.contact_id} value={attendee.contact_id}>
				{attendee.contact_name}
			</option>
		);
	});

	const displaySignupItems = signupList.map((signupList) => {
		if (signupList.contact_id) {
			return (
				<div className="signups-list">
					<p key={signupList.signup_Id} className="saved-signup-item">
						{signupList.description}
					</p>
					<p>{signupList.contact_name}</p>
				</div>
			);
		} else {
			return (
				<div className="signups-list">
					<p key={signupList.signup_Id} className="unsaved-signup-item">
						{signupList.description}
					</p>

					<select className="signup-selector" name="signup-selector">
						<option value="default">Signup Here!</option>
						{signupAttendeeSelector}
					</select>
				</div>
			);
		}
	});
	const displayAttendeeList = attendeeList.map((attendee) => {
		return (
			<div className="attendee-container" key={attendee.contact_name}>
				<li key={attendee.contact_id}>{attendee.contact_name}</li>
			</div>
		);
	});
	const saveSignups = () => {
		const signupContactArr = [];
		const unsavedSignupItems = document.querySelectorAll(
			".unsaved-signup-item"
		);
		const signupSelector = document.querySelectorAll(".signup-selector");
		for (let i = 0; i < unsavedSignupItems.length; i++) {
			signupContactArr.push([
				unsavedSignupItems[i].innerHTML,
				signupSelector[i].value
			]);
		}

		const saveSignupObj = {
			eventID: eventInfo[0].event_id,
			signupContactArr: signupContactArr
		};
		axios
			.post("http://localhost:8000/signup", saveSignupObj)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
		window.location.reload();
	};
	const resetSignups = () => {
		axios
			.put(`http://localhost:8000/signup/${eventID}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
		window.location.reload();
	};
	const deleteEvent = () => {
		if (window.confirm("Do you want to delete this event?")) {
			axios
				.delete(`http://localhost:8000/event/${eventID}`)
				.then((res) => {
					if (res.status === 200) {
						alert("Event Deleted Successfully");
						window.location.href = "http://localhost:3000/";
					}
				})
				.catch((err) => setErrorObj(err));
			if (errorObj) {
				console.log(errorObj);
			}
		}
	};
	//********************
	//Savesignups method depends on the below structure to submit, due to queryselector method.  May need to modify unsaved signup items
	//if changed
	//******************** */
	return (
		<div className="event-details-container">
			<h2 style={{ textDecoration: "underline" }}>Event Details</h2>
			{displayEvent}
			<div className="attendee-signup-container">
				<div className="attendee-list">
					<h3>Attendees</h3>
					{displayAttendeeList}
				</div>
				<div className="signup-contact-container">
					<h3>Items Needed</h3>
					{displaySignupItems}
					<div>
						<button onClick={saveSignups}>Save signups</button>
						<button onClick={resetSignups}>Reset</button>
					</div>
				</div>
			</div>
			<div>
				<button onClick={deleteEvent}>Delete Event</button>
			</div>
		</div>
	);
}
