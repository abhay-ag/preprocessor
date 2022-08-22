const mongoose = require('mongoose');

const User = new Mongoose.Schema({
    uid: {type: String, required: true},
    pwd: {type: String, required: true},
});

const model = mongoose.model('User', User);
module.exports = model;