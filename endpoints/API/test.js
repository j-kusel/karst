const mongoose = require('mongoose');

const Test = mongoose.model('Test');


var get = (req, res, next) => {

    Test.find({})
        .then((tests) => res.send({ tests }));
};

var post = (req, res, next) => {
    var newTest = new Test(req.body);
    newTest.save()
        .then((test) => 
            res.send({ test, message: 'success'}))
        .catch((err) => 
            res.status(500).send({ errors: [err] })
        );
};

module.exports = { get, post };
