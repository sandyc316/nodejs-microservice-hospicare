
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
     * @class mixins.Appointment
     */
    class Appointment {
        constructor (start_at, end_at, fixed_by, status, party1, party2) {
            /**
             * @property startAt
             * @type {timestamp}
             */
            this.startAt = start_at;

            /**
             * @property endAt
             * @type {timestamp}
             */
            this.endAt = end_at;

            /**
             * @property fixedBy
             * @type {uuid}
             */
            this.fixedBy = fixed_by;

            /**
             * @property status
             * @type {string}
             */
            this.status = status;

            /**
             * @property party1
             * @type {json}
             */
            this.party1 = party1;

            /**
             * @property party2
             * @type {json}
             */
            this.party2 = party2;
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

    return {
        'Appointment'   : Appointment,
        'Timestamped'   : Timestamped,
        'Storable'      : Storable
    };
};
