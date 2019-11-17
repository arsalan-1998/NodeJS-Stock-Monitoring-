
const express = require('express')
const app = express.Router()
const mongoose = require('../model/connection')
const storeSchema = require('../model/schema')

const Store = mongoose.model('alinas', storeSchema)

app.get('/', (_req, res) => { 
	Store.find().then((sData) => res.render('data', {'items' : sData}))
})

module.exports.app = app;