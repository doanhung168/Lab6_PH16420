const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Car = new Schema({
    name: {type: String},
    price: {type: String},
    images: [String]
}, {timestamps: true})

module.exports = mongoose.model('Car', Car)