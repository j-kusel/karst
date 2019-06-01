module.exports = (app) => {
    app.route('/')
        .get((req, res, next) => res.render('app'));
    app.route('/debug')
        .get((req, res, next) => res.render('debug'));
};
    
