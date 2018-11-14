
var Model = require('./model');

class memberModel extends Model  {
	constructor() {
		super();
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			this.query('SELECT * FROM members where id = $1', [id], (err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	add(firstName, lastName, relation, patient) {
		return new Promise( (resolve,reject) => {

			this.query('INSERT INTO members ( first_name, last_name, relationship, patient) VALUES($1, $2, $3, $4) RETURNING *',
			[firstName, lastName, relation, patient],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	getMembersByPatientId(patient) {
		return new Promise((resolve, reject) => {
			this.query('SELECT * FROM members where patient = $1', [patient], (err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}


	getByPatientAndId(patient, memberId) {
		return new Promise( (resolve, reject) => {
			this.query('SELECT * from members where patient = $1 AND id = $2', [patient, memberId],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	addMedicalProfile(patient, memberId, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) {
		return new Promise( (resolve, reject) => {

			var medicalProfile = this.createJSON( gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory);

			this.query('UPDATE members SET medical_profile = $1 WHERE id=$2 RETURNING *',
			[medicalProfile, memberId],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	updateMemberById(memberId, firstName, lastName, relationship) {
		return new Promise( (resolve, reject) => {

			this.query('UPDATE members SET first_name = $1, last_name = $2, relationship = $3 WHERE id=$4 RETURNING *',
			[firstName, lastName, relationship, memberId],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	createJSON( gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) {
		var medicalProfile = {};
		medicalProfile.gender = gender;
		medicalProfile.birth_date = birthDate;
		medicalProfile.blood_group = bloodGroup;
		medicalProfile.height = height;
		medicalProfile.weight =weight;
		medicalProfile.allergies = allergies;
		medicalProfile.medical_history = medicalHistory;

		return  medicalProfile;
	}
	
}


module.exports = memberModel;
