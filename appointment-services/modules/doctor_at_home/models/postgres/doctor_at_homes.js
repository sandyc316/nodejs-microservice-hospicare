
var Model = require('./model');

class appointmentModel extends Model  {
	constructor() {
		super();
	}

	getById(id) {
		return new Promise((resolve, reject) => {

			this.query('SELECT * FROM doctor_at_homes WHERE id = $1', [id], (err, res) => {
				console.log("Insde doctor_at_homes model promise. Got results!");
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


	create(patientId, patientFirstName, patientLastName, patientEmail, patientPhone, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, member, speciality, emergency, address, report, description, reason, status, fixedBy, prescriptions, followUp, followStatus, type, startAt, endAt) {
		return new Promise( (resolve,reject) => {

			var party1 = this.createJSON(patientId, patientFirstName, patientLastName, patientEmail, patientPhone);
			var party2 = this.createJSON(doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone);

			if(member === '') {
				member = null;
			}
			
			if(followUp === '') {
				followUp = null;
			}

			this.query('INSERT INTO doctor_at_homes ( patient, doctor, member, speciality, emergency, address, report, description, reason, status, fixed_by, prescriptions, follow_up, follow_status, type, start_at, end_at, party1, party2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *',
			[patientId, doctorId, member, speciality, emergency, address, report, description, reason, status, fixedBy, prescriptions, followUp, followStatus, type, startAt, endAt, party1, party2],
			(error, result) => {
				console.log('error is', error);

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

	updateStatus(id, status) {
		return new Promise( (resolve,reject) => {

			this.query('UPDATE doctor_at_homes SET status=$1 WHERE id=$2 RETURNING *',
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

	updateSchedule(id, doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone, startAt, endAt) {
		return new Promise( (resolve, reject) => {

			var party2 = this.createJSON(doctorId, doctorFirstName, doctorLastName, doctorEmail, doctorPhone);

			this.query('UPDATE doctor_at_homes SET doctor=$1, start_at=$2, end_at=$3, party2=$4 WHERE id=$5 RETURNING *',
			[doctorId, startAt, endAt, party2, id],
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

	updateReports(id, report) {

		return new Promise( (resolve,reject) => {

			this.query('UPDATE doctor_at_homes SET report=$1 WHERE id=$2 RETURNING *',
			[report, id],
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


	update(id, patient, doctor, member, speciality, emergency, address, report, description, reason, status, prescriptions, followUp, followStatus, type, startAt, endAt) {
		return new Promise( (resolve,reject) => {

			this.query('UPDATE doctor_at_homes SET patient=$1, doctor=$2, member=$3, speciality=$4, emergency=$5, address=$6, report=$7, description=$8, reason=$9, status=$10, prescriptions=$11, follow_up=$12, follow_status=$13, type=$14, start_at=$15, end_at=$16 WHERE id=$17 RETURNING *',
			[patient, doctor, member, speciality, emergency, address, report, description, reason, status, prescriptions, followUp, followStatus, type, startAt, endAt, id],
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

	getByPatient(patient, page, per_page, startAt, endAt) {

		return new Promise((resolve, reject) => {

			var offset = (page-1) * per_page;
			this.query('SELECT * FROM doctor_at_homes WHERE (patient = $1 AND start_at >= $2 AND end_at <= $3) LIMIT $4 OFFSET $5',
				[patient, startAt, endAt, per_page, offset], (err, res) => {
				console.log("Insde doctor_at_homes model promise. Got results!");
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

	getByDoctor(page, per_page, startAt, endAt, type) {
		return new Promise((resolve, reject) => {

			var offset = (page-1) * per_page;
			this.query('SELECT * FROM doctor_at_homes WHERE (type = $1 AND start_at >= $2 AND end_at <= $3) LIMIT $4 OFFSET $5',
				[type, startAt, endAt, per_page, offset], (err, res) => {
				console.log("Insde doctor_at_homes model promise. Got results!");
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

	createJSON(id, firstName, lastName, email, phone) {
		
		var party = {};
		
		party.id = id;
		party.firstName = firstName;
		party.lastName = lastName;
		party.email = email;
		party.phone = phone;

		return party;
	}
	
}


module.exports = appointmentModel;
