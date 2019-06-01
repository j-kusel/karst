const mongoose = require('mongoose');

const AuthorModel = mongoose.model('Author');


var get = (req, res, next) => {
    AuthorModel.find({})
        .sort('Name')
        .then((Authors) => res.send({ Authors }))
        .catch((err) => res.status(400).send({ errors: [err] }));
};

var post = (req, res, next) => {
    var body = {
        Name: req.body.AuthorName,
        Description: req.body.AuthorDescription,
        Birth: req.body.Birthdate,
        Death: req.body.Deathdate,
        // Wiki:
    };
    if (req.body.AuthorCat)
        body.Categories = [req.body.AuthorCat];
    if (req.body.AuthorDates)
        body.Dates = [req.body.AuthorDates];
    newAuthorModel = new AuthorModel(body);
    newAuthorModel.save()
        .then((author) => {
            console.log(author);
            res.send({ message: 'success'});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send({ errors: [err] });
        });
};

module.exports = { get, post };
