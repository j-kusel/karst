const express = require('express');
const cors = require('cors');
//const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');


module.exports = () => {
    const app = express();
    
    [
        morgan('dev'),
        bodyParser.urlencoded({
            extended: true
        }),
        bodyParser.json(),
        cors(),

        express.static('public')
    ].forEach(plugin => app.use(plugin));

    app.set('view engine', 'ejs');


    return app;
};
