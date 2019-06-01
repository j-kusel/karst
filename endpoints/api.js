var date = require('./API/date');
var categories = require('./API/categories');
    

module.exports = (app) => {
    app.route('/api/dates')
        .get(date.get)
        .post(date.post);

    app.route('/api/categories')
        .get(categories.get)
        .post(categories.post);
};
    
