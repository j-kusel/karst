const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DateSchema = new Schema({
    Name: String,
    Date: Date,
    Description: String,
    //category: (other reference)
    created: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Date', DateSchema);
