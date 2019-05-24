const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = () => {
    const connectionStr = `mongodb://${config.mongoose.username}:${config.mongoose.password}@${config.mongoose.host}:27017/${config.mongoose.db}`;
    const db = mongoose.connect(connectionStr, { useNewUrlParser: true });

    var models = [
        'date'        
    ]

    models.forEach(model => require('../models/' + model));

    return db;
};

