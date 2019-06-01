const mongoose = require('mongoose');

const CategoryModel = mongoose.model('Category');


var get = (req, res, next) => {
    CategoryModel.find({})
        .sort('Name')
        .then((Categories) => res.send({ Categories }))
        .catch((err) => res.status(400).send({ errors: [err] }));
};

var post = (req, res, next) => {
    var body = {
        Name: req.body.CategoryName,
        Description: req.body.CategoryDescription
    };
    if (req.body.CategorySup)
        body.Supercategories = [req.body.CategorySup];
    newCategoryModel = new CategoryModel(body);
    newCategoryModel.save()
        .then((cat) => {
            console.log(cat);
            res.send({ message: 'success'});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send({ errors: [err] });
        });
};

module.exports = { get, post };
