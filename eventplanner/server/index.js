//imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const { getContacts, addContact } = require("./controllers/contactController");
const {
	getEvents,
	addEvent,
	eventDetails,
	getSignupItems,
	getAttendees,
	saveSignups,
	resetSignups,
	getPastEvents,
	deleteEvent,
	updateNotes
} = require("./controllers/eventController");
const { reset } = require("nodemon");

const app = express();

const { PORT, CONNECTION_STRING } = process.env;

//middleware
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(CONNECTION_STRING, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false
		}
	}
});

sequelize.authenticate().then(() => {
	//endpoints
	app.get("/", getEvents);
	app.get("/contacts", getContacts);
	app.post("/", addContact);
	app.post("/addevent", addEvent);
	app.get("/event/:id", eventDetails);
	app.get("/signup/:id", getSignupItems);
	app.get("/attendees/:id", getAttendees);
	app.post("/signup", saveSignups);
	app.put("/signup/:id", resetSignups);
	app.get("/pastevents", getPastEvents);
	app.delete("/event/:id", deleteEvent);
	app.put("/pastevents", updateNotes);

	//APP LISTEN
	app.listen(PORT, () => {
		console.log(`Server up and running on ${PORT}`);
	});
});
