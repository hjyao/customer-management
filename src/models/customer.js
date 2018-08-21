const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    id: {type: Number},
    name: {type: String, required: true, max: 100},
    address: {type: String, required: true, max: 200},
    mobile: {type: Number, required: true},
    status: {type: Number, required: true},
    notes: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Customer', CustomerSchema);