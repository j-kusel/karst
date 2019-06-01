const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    Name: String,
    Description: String,
    Birth: Date,
    Death: Date,
    Wiki: String,
    Dates: [{
        type: Schema.Types.ObjectId,
        ref: 'Date'
    }],
    Categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    created: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Author', AuthorSchema);
