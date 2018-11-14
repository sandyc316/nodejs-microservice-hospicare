
/* Common mixins
 *
 * @module mixins
 */
module.exports = function (cfg) {
    var mime = require('mime'),
        _    = require('lodash');


    /**
     * Someone with a name
     *
     * @constructor
     * @class mixins.Person
     */
    class Person {
        constructor (fname, lname) {
            /**
             * @property fname
             * @type {String}
             */
            this.fname = fname;
            
            /**
             * @property lname
             * @type {String}
             */
            this.lname = lname;
        }
    }


    /**
     * A phone number
     *
     * @constructor
     * @class mixins.PhoneNumber
     */
    class PhoneNumber {
        constructor (ccode, number) {
            /**
             * Country dialing code. Ex: 91
             *
             * @property ccode
             * @type {Number}
             */
            this.ccode = ccode;

            /**
             * Phone number
             *
             * @property number
             * @type {String}
             */
            this.number = number;
        }

        toString () {
            return ['(+', this.ccode, ') ', this.number].join('');
        }
    }

    /**
     * Someone with an email address and / or phone
     *  
     * @constructor
     * @class mixins.Contact
     * @extends mixins.Person
     */
    class Contact extends Person {
        constructor (fname, lname, email, phone) {
            super(fname, lname);

            /**
             * @property email
             * @type {String}
             */
            this.email = email;

            /**
             * @property phone
             * @type {PhoneNumber}
             */
            this._phone = phone;
        }

        set phone (phoneNumber) {
            this._phone = {
                ccode: phoneNumber.ccode,
                number: phoneNumber.number
            };
        }

        get phone () {
            var p = new PhoneNumber();
            p.ccode = this._phone ? this._phone.ccode : null;
            p.number = this._phone ? this._phone.number : null;
            return p;
        }
    }


    /**
     * A Timestamped object
     *
     * @constructor
     * @class mixins.Timestamped
     */
    class Timestamped {
        constructor(createTime, updateTime) {
            /**
             * @property createTime
             * @type {Date}
             */
            this._createTime = createTime;

            /**
             * @property updateTime
             * @type {Date}
             */
            this._updateTime = updateTime;
        }

        get createTime () {
            return new Date(this._createTime);
        }

        set createTime (time) {
            console.log(time);
            this._createTime = time.getTime();
        }

        get updateTime () {
            return new Date(this._updateTime);
        }

        set updateTime (time) {
            this._updateTime = time.getTime();
        }

        /**
         * Update timestamps
         *
         * @method touch
         * @for mixins.Timestamped
         */
        touch() {
            this._updateTime = _.now();

            if (!this._createTime) {
                this._createTime = _.now();
            }
        }
    }


    /**
     * A storable object
     *
     * @constructor
     * @class mixins.Storable
     * @uses mixins.Timestamped
     */
    class Storable extends Timestamped {
        constructor() {
            super();

            /**
             * @property _id
             * @type {Object}
             */
            this._id = null;
        }   
    }

    /**
     * @constructor
     * @class mixins.File
     */
    class File {
        constructor(filename, key, mime) {
            /**
             * Original filename
             *
             * @property filename
             * @type {String}
             */
            this.filename = filename;

            /**
             * Unique key that points to this file in a filestore
             *
             * @property key
             * @type {String}
             */
            this.key = key;

            /**
             * MIME type
             *
             * @property mime
             * @type {String}
             */
            this._mime = mime;    
        }

        get mime() {
            if (this._mime) {
                return this._mime;
            } else if(this.filename) {
                return mime.lookup(this.filename);
            } else { // Return application/octet-stream by default
                return 'application/octet-stream';
            }
        }

        set mime(m) {
            /* TODO: set enumerable to true using Object.defineProperty
            'enumerable': true, */
            this._mime = m;
        }
    }


    return {
        'Person'     : Person,
        'Contact'    : Contact,
        'PhoneNumber': PhoneNumber,
        'File'       : File,
        'Timestamped': Timestamped,
        'Storable'   : Storable
    };
};
