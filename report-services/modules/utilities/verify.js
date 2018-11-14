/**
 * For verifying anything that can be represented with a string and can be
 * verified with a code
 *
 * @module verify
 */
module.exports = function (cfg) {
    var mixins   = require('./mixins')(cfg, db),
        _        = require('lodash'),
        crypto   = require('crypto'),
        Storable = mixins.Storable,
        //cfg      = require('../../cfg'),
        db       = require('mongojs')(cfg.mongo),
        coll     = db.collection('verifications');


    function Record(type, data, code, ttl) {
        Storable.call(this);

        this.type = type;
        this.data = data;
        this.code = code;
        this.expiryTime = _.now() + ttl;
        this.status = 'pending';
    }
    Record.prototype = _.extend({}, Storable.prototype);

    /**
     * @class verify.Code
     */
    function Code() {}

    /**
     * Generate a new verification code for some data to be verified
     *
     * @static
     * @method generate
     * @for verify.Code
     * @param  {String} type Type of verification. Ex - 'email', 'password-reset'
     * @param  {String} data Data to verify
     * @param  {Number} [ttl] Time (in ms) after which this verification code
     *                        will expire. Default = 1hr
     * @return {Promise} Verification code
     */
    Code.generate = function (type, data, ttl) {
        if (typeof ttl === 'undefined') {
            ttl = 1 * 60 * 60 * 1000; // 1hr default ttl
        }

        // generate code
        var seed = crypto.randomBytes(20);
        var code = crypto.createHash('sha1').update(seed).digest('hex');

        // save record
        var record = new Record(type, data, code, ttl);
        record.touch();

        return new Promise(function (resolve, reject) {
            coll.insert(record, function (err, doc) {
                if (err) {
                    return reject(err);
                }

                coll.update({
                    'type': type,
                    'data': data,
                    'status': 'pending',
                    'expiryTime' : {
                        $gt: _.now()
                    },
                    '_id': {
                        $ne: doc._id
                    }
                }, {
                    $set: {
                        'status': 'expired'
                    }
                }, {multi: true}, function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(code);
                });
            });
        });
    };

    /**
     * Verify data using a given code
     *
     * @static
     * @method verify
     * @for verify.Code
     * @param  {String} type Type of data to verify. Ex - 'email'
     * @param  {String} data Data to verify
     * @param  {String} code Verification code
     * @param  {Boolean} [expire] Whether to expire code on verification.
     *                            Defaults to `true`
     * @return {Promise} Boolean result
     */
    Code.verify = function (type, data, code, expire) {
        if (typeof expire === 'undefined') {
            expire = true;
        }

        return new Promise(function (resolve, reject) {
            coll.findOne({
                'type': type,
                'data': data,
                'code': code,
                'status': 'pending',
                'expiryTime': {
                    $gt: _.now()
                }
            }, function (err, doc) {
                if (err) {
                    return reject(err);
                }

                if (! doc) {
                    return resolve(false);
                }

                if (! expire) {
                    return resolve(true);
                }

                coll.update({
                    '_id': doc._id
                }, {
                    $set: {
                        'status': 'verified'
                    }
                }, function (err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(true);
                });
            });
        });
    };

    /**
     * Expire all codes for given type and data
     *
     * @static
     * @method expire
     * @for verify.Code
     * @param  {String} type Type of data to expire. Ex - 'email'
     * @param  {String} data Data to expire
     * @return {Promise} Boolean result
     */
    Code.expire = function (type, data) {
        return new Promise(function (resolve, reject) {
            coll.update({
                'type': type,
                'data': data,
                'status': 'pending',
                'expiryTime': {
                    $gt: _.now()
                }
            }, {
                $set: {
                    'status': 'verified'
                }
            }, function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(true);
            });
        });
    };

    return {
        'Code': Code
    };
};
