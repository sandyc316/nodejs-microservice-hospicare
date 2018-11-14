
var Model = require('./model');

class appointmentModel extends Model  {
	constructor() {
		super();
	}

	getById(id) {
		return new Promise((resolve, reject) => {

			this.query('SELECT * FROM appointment_at_hospitals WHERE id = $1', [id], (err, res) => {
				console.log("Insde appointment_at_hospitals model promise. Got results!");
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

	create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, hospitalId, hospitalName, hospitalAddress, hospitalEmail, hospitalPhone, member, speciality, report, description, reason, status, fixedBy, startAt) {
		return new Promise( (resolve,reject) => {

			var party1 = this.createJSON(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, 'patient');
			var party2 = this.createJSON(hospitalId, hospitalName ,hospitalAddress, hospitalEmail, hospitalPhone, 'hospital');

			this.query('INSERT INTO appointment_at_hospitals ( patient, hospital, member, speciality, report, description, reason, status, fixed_by, start_at, party1, party2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
			[patientId, hospitalId, member, speciality, report, description, reason, status, fixedBy, startAt, party1, party2],
			(error, result) => {

				if(error) {
					return reject(error);
				} else if(result.rows.length > 0) {
					return resolve(result.rows[0]);
				} else {
					return reject(null);
				}

			});
		});
	}

	updateStatus(id, status) {
		return new Promise( (resolve,reject) => {

			this.query('UPDATE appointment_at_hospitals SET status=$1 WHERE id=$2 RETURNING *',
			[status, id],
			(error, result) => {
				if(error) {
					return reject(error);
				} else if(result.rows.length > 0) {
					return resolve(result.rows);
				} else {
					return reject(null);
				}
				
			});
		});
	}

	updateSchedule(id, startAt) {
		return new Promise( (resolve, reject) => {

			this.query('UPDATE appointment_at_hospitals SET start_at=$1 WHERE id=$2 RETURNING *',
			[startAt, id],
			(error, result) => {
				if(error) {
					return reject(error);
				} else if(result.rows.length > 0) {
					return resolve(result.rows[0]);
				} else {
					return reject(null);
				}
				
			});

		});
	}

	getByPatient(patient, page, per_page, startAt, endAt) {

		return new Promise((resolve, reject) => {

			var offset = (page-1) * per_page;
			this.query('SELECT * FROM appointment_at_hospitals WHERE (patient = $1 AND start_at >= $2 AND end_at <= $3) LIMIT $4 OFFSET $5',
				[patient, startAt, endAt, per_page, offset], (err, res) => {
				console.log("Insde appointment_at_hospitals model promise. Got results!");
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

	createJSON(id, firstName, tag, email, phone, type) {
		
		var party = {};
		
		party.id = id;
		party.firstName = firstName;
		party.email = email;
		party.phone = phone;

		if(type === 'patient') {
			party.lastName = tag;
		} else {
			party.address = tag;
		}

		return party;
	}
	
}


module.exports = appointmentModel;
