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
    
    // User
    {a: 'user', can: 'guest'},
    {a: 'user', can: 'profile - view'},
    {a: 'user', can: 'profile - edit'},
    {a: 'user', can: 'cart - view'},
    {a: 'user', can: 'cart - remove item'},
    {a: 'user', can: 'cart - checkout'},
    {a: 'user', can: 'order - view'},
    {a: 'user', can: 'order - pay'},
    {a: 'user', can: 'question - ask'},
    
    // Producer
    {a: 'producer', can: 'user'},
    {a: 'producer', can: 'campaigns - add'},
    {a: 'producer', can: 'campaigns - edit'},
    {a: 'producer', can: 'campaigns - admin view list'},

    // Admin
    {a: 'admin', can: 'producer'},
    {a: 'admin', can: 'investors - view'},
    {a: 'admin', can: 'investors - accept'},
    {a: 'admin', can: 'investors - reject'}
];
