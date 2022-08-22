const mongoose = require('mongoose');

const User = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    pwd: {type: String, required: true},
});

const model = mongoose.model('User', User);
module.exports = model;