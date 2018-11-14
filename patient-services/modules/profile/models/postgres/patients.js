
var Model = require('./model');

class patientModel extends Model  {
	constructor() {
		super();
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			this.query('SELECT * FROM patients where id = $1', [id], (err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	getByEmail(email) {
		return new Promise((resolve, reject) => {
			
			this.query('SELECT * FROM patients where email = $1', [email], (err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}


	create(firstName, lastName, email, phone) {
		return new Promise( (resolve,reject) => {

			this.query('INSERT INTO patients ( first_name, last_name, email, phone) VALUES($1, $2, $3, $4) RETURNING *',

			[firstName, lastName, email, phone],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}


	addMedicalProfile(id, gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory) {
		return new Promise( (resolve, reject) => {

			var medicalProfile = this.createJSON( gender, birthDate, bloodGroup, height, weight, allergies, medicalHistory);

			this.query('UPDATE patients SET medical_profile = $1 WHERE id=$2 RETURNING *',
			[medicalProfile, id],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	addUserAddress(id, lat, lng, address, street, locality, city, zipcode, state, country, tag) {
		return new Promise( (resolve, reject) => {
			
			this.query('INSERT INTO addresses ( user_id, lat, lng, address, street, locality, city, zipcode, state, country, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
			[id, lat, lng, address, street, locality, city, zipcode, state, country, tag],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	getAddressByUserId(user_id) {
		return new Promise ( (resolve, reject) => {

			this.query('SELECT * FROM addresses where user_id = $1', [user_id], (err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	isProfileUpdated(userId) {
		return new Promise ( (resolve, reject) => {

			this.query('SELECT * FROM patients where id = $1', [userId], (err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	updateUserAddress(id, addressId, lat, lng, address, street, locality, city, zipcode, state, country, tag) {
		return new Promise( (resolve, reject) => {

			this.query('UPDATE addresses SET lat=$1, lng=$2, address=$3, street=$4, locality=$5, city=$6, zipcode=$7, state=$8, country=$9, tag=$10 WHERE (id=$11 AND user_id=$12)  RETURNING *',
			[lat, lng, address, street, locality, city, zipcode, state, country, tag, addressId, id],
			(err, res) => {
				if ( err ) {
					return reject( err );
				} else {
					return resolve( res.rows );
				}
			});
		});
	}

	getAddressById(addressId) {
		return new Promise ( (resolve, reject) => {

			this.query('SELECT * FROM addresses WHERE id = $1', [addressId], (err, res) => {
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


module.exports = patientModel;
