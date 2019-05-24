module.exports = (app) => {
    app.route('/')
        .get((req, res, next) => res.render('app'));
};
    
