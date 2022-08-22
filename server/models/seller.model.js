const mongoose = require('mongoose');

const Seller = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    limit: {type: Number, required: true},
    crop: {type: String, required: true},
});

const model = mongoose.model('Seller', Seller);
module.exports = model;