const mongoose = require('mongoose')

const Bid = new mongoose.Schema({
    uid: {type: String, required: true},
    amt: {type: Number, required: true},
    crop: {type: String, required: true},
    qty: {type: Number, required: true},
    status: {type: String, required: true},
})

const model = mongoose.model('Bid', Bid)
module.exports = model;