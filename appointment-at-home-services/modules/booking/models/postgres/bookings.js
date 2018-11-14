
var Model = require('./model');

class bookingModel extends Model  {
	constructor() {
		super();
	}

	getById(id) {
		return new Promise((resolve, reject) => {

			this.query('SELECT * FROM bookings where id = $1', [id], (err, res) => {
				console.log("Insde bookings model promise. Got results!");
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


module.exports = bookingModel;
