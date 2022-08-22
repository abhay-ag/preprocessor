const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    uid: {type: String, required: true },
    produce: {type: Number, required: true},
    dist: {type: String, required: true},
    state: {type: String, required: true},
    crop : {type: String, required: true},
});

const model = mongoose.model('Product', Product);

module.exports = model;
