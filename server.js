const config = require('./config/config');

var app = require('./config/express')();
var mongo = require('./config/mongoose')();

mongo.then(() => {
    require('./endpoints/app')(app);
    require('./endpoints/api')(app);
    
    console.log('karst app listening on port' + config.port);

    app.listen(config.port); 
});
