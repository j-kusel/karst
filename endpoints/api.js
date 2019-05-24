var date = require('./API/date');

module.exports = (app) => {
    app.route('/api/dates')
        .get(date.get)
        .post(date.post);
};
    
