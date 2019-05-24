const mongoose = require('mongoose');

const DateModel = mongoose.model('Date');


var get = (req, res, next) => {
    DateModel.find({})
        .sort('Date')
        .then((dates) => res.send({ dates }))
        .catch((err) => res.status(400).send({ errors: [err] }));
};

var post = (req, res, next) => {
    var newDateModel = new DateModel(req.body);
    newDateModel.save()
        .then((date) => 
            res.send({ date, message: 'success'}))
        .catch((err) => 
            res.status(400).send({ errors: [err] })
        );
};

module.exports = { get, post };
