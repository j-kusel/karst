const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    Name: String,
    Description: String,
    Subcategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    Supercategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    created: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Category', CategorySchema);
