const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    dist: {type: String, required: true},
    aadhar: {type: Number, required: true},
    phone: {type: Number, required: true},
});

const model = mongoose.model('Profile', Profile);
module.exports = model;