module.exports = [
    // Guests
    {a: 'guest', can: 'campaign - view'},
    {a: 'guest', can: 'campaigns - view'},
    {a: 'guest', can: 'password - forgot'},
    {a: 'guest', can: 'password - reset', when: function (params, cb) {
        params.greenlightme.verify.Code.verify('password', params.user.email, params.code, false)
            .then(function (res) {
                cb(null, res);
            })
            .catch(function (err) {
                process.nextTick(function () {
                    cb(err);
                });
            });
    }},
];
