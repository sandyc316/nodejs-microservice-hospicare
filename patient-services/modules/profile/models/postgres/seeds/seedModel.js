var config     = require('../../../../cfg'),
    _          = require('lodash'),
    faker      = require('faker'),
    co         = require('co'),
    Model      = require('../model');


class seedModel extends Model {
	constructor() {
		super();

        this.userIds = [];
	}

    users() {
        const qtext = 'INSERT INTO users(id, fName, lName, email, phone, password, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [];
        for (var i = 0; i < 10; i++) {
            values.push([
                faker.random.uuid(),
                faker.name.firstName(),
                faker.name.lastName(),
                faker.internet.email(),
                faker.phone.phoneNumber(),
                1234,
                faker.random.arrayElement(['User', 'Admin'])
            ]);
        }

        var tasksArray = [];

        _.each(values, value => {
            this.userIds.push(value[0]); 
            tasksArray.push(this.queryPromise(qtext, value));
        });

        return Promise.all(tasksArray)
        .then(res => console.log(res.length))
        .catch(err => console.error('Error adding user seeds', err.stack))
    }

    patients() {
        if (this.userIds.length === 0) {
            console.log("No User Ids found! Seed users first.");
            return;
        }

        const qtext = 'INSERT INTO patients(userid, patientid, dob, bloodgrp, weight, height, allergies) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [];

        for (var i = 0; i < this.userIds.length; i++) {
            values.push([
                this.userIds[i],
                faker.internet.userName(),
                faker.date.past(),
                faker.random.arrayElement(['O+ve', 'A+ve', 'B+ve', 'AB+ve', 'O-ve', 'A-ve', 'B-ve', 'AB-ve']),
                faker.random.number({ min: 50, max: 99, precision: 1 }),
                faker.random.number({ min: 130, max: 189, precision: 1 }),
                faker.lorem.paragraph()
            ]);
        }

        var tasksArray = [];
        _.each(values, value => {
            tasksArray.push(this.queryPromise(qtext, value));   
        });

        return Promise.all(tasksArray)
        .then(res => console.log(res.length))
        .catch(err => console.error('Error adding user seeds', err.stack))
    }
} 


module.exports = seedModel;
