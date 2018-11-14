
const { Pool, Client } = require('pg');

const pool = new Pool({
	connectionString: "postgres://postgres:postgres@db:5432/familycare"
});

class Model {
	constructor() {

	}

	query (text, params, callback) {
		return pool.query(text, params, callback);
	}

	queryPromise(text, params) {
		return pool.query(text, params)
		.then(res => {return res;})
		.catch(err => console.error('Error executing query', err.stack))
	}
}

module.exports = Model;
