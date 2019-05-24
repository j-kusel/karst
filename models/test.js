const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    name: String,
    date: Date,
    created: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Test', TestSchema);
