
const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    item: String,
    code: String,
    price: Number,
    quantity: Number,
    total_price: Number
});

module.exports.storeSchema = storeSchema;