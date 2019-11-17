
const mongoose = require('mongoose')
const con = ''

async function getConnection() {
    con = await mongoose.connect('mongodb://localhost/alinas', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
}

module.exports.con = con;