module.exports = function (app) {

    app.use('/patients', require('./controllers/profile'));
    //todo: replace with /patients/member 
    app.use('/patients/:id/members', require('./controllers/members'));
};
