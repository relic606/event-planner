const { Sequelize } = require("sequelize");
const axios = require("axios");

const { PORT, CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false
		}
	}
});

module.exports = {
	getEvents: async (req, res) => {
		const eventList = (
			await sequelize.query(
				`select * from events where event_date >= CURRENT_DATE order by event_date asc`
			)
		)[0];

		res.status(200).send(eventList);
	},
	getPastEvents: async (req, res) => {
		const pastEventList = (
			await sequelize.query(
				`select * from events where event_date < CURRENT_DATE order by event_date desc`
			)
		)[0];

		res.status(200).send(pastEventList);
	},
	addEvent: async (req, res) => {
		console.log(req.body);
		const { eventName, date, signUpItemsArr, attendeeArr } = req.body;
		const time = date.split("T")[1];
		await sequelize.query(`insert into events (event_name, event_date, event_time, notes)
		values('${eventName}', '${date}', '${time}', 'notes here');`);

		const rawEventID = await sequelize.query(`select (event_id) from events
		WHERE event_name = '${eventName}'`);

		const formattedEventID = rawEventID[0][0].event_id;

		console.log(signUpItemsArr);

		for (let i = 0; i < signUpItemsArr.length; i++) {
			await sequelize.query(
				`insert into signup(description, event_id, contact_id)
				values('${signUpItemsArr[i]}', '${formattedEventID}', null)`
			);
		}

		for (let i = 0; i < attendeeArr.length; i++) {
			console.log(i);
			await sequelize.query(`insert into events_contacts_join(contact_id, event_id)
						values('${attendeeArr[i]}', '${formattedEventID}')`);
		}
		res.status(200);
	},
	eventDetails: async (req, res) => {
		const eventID = req.params.id;
		console.log(eventID);
		const event = await sequelize.query(
			`Select * from events WHERE event_id = ${eventID}`
		);
		res.status(200).send(event[0]);
	},
	getSignupItems: async (req, res) => {
		const eventID = req.params.id;
		const signupItems = await sequelize.query(
			`select signup.signup_id, signup.description, contacts.contact_id, contacts.contact_name from signup left join contacts on signup.contact_id = contacts.contact_id where event_id = ${eventID}`
			// `Select * from signup WHERE event_id = ${eventID}`
		);
		console.log(signupItems);
		res.status(200).send(signupItems[0]);
	},
	getAttendees: async (req, res) => {
		const eventID = req.params.id;
		const attendeeList = await sequelize.query(
			`Select * from events_contacts_join right join contacts on events_contacts_join.contact_id = contacts.contact_id WHERE event_id = ${eventID} `
		);
		res.status(200).send(attendeeList[0]);
	},
	deleteEvent: async (req, res) => {
		const eventID = req.params.id;
		await sequelize.query(`delete from events where event_id = ${eventID}`);
		res.sendStatus(200);
	},
	saveSignups: async (req, res) => {
		const { eventID, signupContactArr } = req.body;
		for (let i = 0; i < signupContactArr.length; i++) {
			console.log(eventID, signupContactArr[i]);
			await sequelize.query(
				`update signup set contact_id = ${signupContactArr[i][1]} where event_id=${eventID} and description LIKE '${signupContactArr[i][0]}'`
			);
		}
	},
	resetSignups: async (req, res) => {
		const eventID = req.params.id;
		await sequelize.query(
			`UPDATE signup 
			SET contact_id = NULL 
		  WHERE event_id = ${eventID}`
		);
		res.sendStatus(200);
	},
	updateNotes: async (req, res) => {
		const { eventID, eventNotes } = req.body;
		// console.log(eventID, eventNotes);
		await sequelize.query(`update events
		set notes = '${eventNotes}'
		where event_id = ${eventID}`);
		res.sendStatus(200);
	}
};
