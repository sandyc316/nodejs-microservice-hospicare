
var Model = require('./model');

class reportModel extends Model  {
	constructor() {
		super();
	}

	getById(id) {
		return new Promise((resolve, reject) => {

			this.query('SELECT * FROM reports where id = $1', [id], (err, res) => {
				console.log("Insde reports model promise. Got results!");
				if ( err ) {
					return reject( err );
				} else if(res.rows.length > 0) {
					return resolve( res.rows );
				} else {
					return reject(null);
				}
			});

		});
	}

	getByPatientId(patient) {
		return new Promise((resolve, reject) => {

			this.query('SELECT * FROM reports where patient = $1', 
				[patient], (err, res) => {
				console.log("Insde reports model promise. Got results!");
				if ( err ) {
					return reject( err );
				} else if(res.rows.length > 0) {
					return resolve( res.rows );
				} else {
					return reject(null);
				}
			});

		});
	}

	add(originalname, mimetype, filename, path, size, patient) {
		return new Promise( (resolve,reject) => {

			this.query('INSERT INTO reports ( originalname, mimetype, filename, path, size, patient) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[originalname, mimetype, filename, path, size, patient],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else if(res.rows.length > 0) {
					return resolve( res.rows );
				} else {
					return reject(null);
				}
			});

		});
	}

	update(id, originalname, mimetype, filename, path, size, patient ) {
		return new Promise( (resolve,reject) => {

			this.query('UPDATE reports SET originalname=$1, mimetype=$2, filename=$3, path=$4, size=$5, patient = $6 WHERE id=$7 RETURNING *',
			[originalname, mimetype, filename, path, size, patient, id],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else if(res.rows.length > 0) {
					return resolve( res.rows );
				} else {
					return reject(null);
				}
			});

		});
	}
}


module.exports = reportModel;
