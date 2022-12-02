const { Sequelize } = require("sequelize");

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
	getContacts: async (req, res) => {
		const [contactList] = await sequelize.query(`Select * from contacts`);
		res.status(200).send(contactList);
	},
	addContact: async (req, res) => {
		const { name, email, phone } = req.body;
		await sequelize.query(`insert into contacts(contact_name, email, phone_number)
		values('${name}', '${email}', '${phone}')`);
		res.status(200).send("Contact added");
	}
};
