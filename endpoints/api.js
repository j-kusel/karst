var date = require('./API/date');

module.exports = (app) => {
    app.route('/date')
        .get(date.get)
        .post(date.post);
};
    
