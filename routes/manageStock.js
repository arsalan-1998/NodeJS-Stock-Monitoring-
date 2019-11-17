
const express = require('express')
const app = express.Router()
const mongoose = require('../model/connection')
const storeSchema = require('../model/schema')

const Store = mongoose.model('alinas', storeSchema)
var id = '0bxecedddd'

app.get('/', (_req, res) => {
	Store.find().then((sData) => res.render('stocks', {'items' : sData}))
})

app.post('/', (req, res) => { 
	for(key in req.body) {
		id = key
	}
		Store.findOne({_id:id}).then((sData) => {
		const item = sData.item
		var code = sData.code
		var quantity = sData.quantity
		res.render('stockForm', {'item':item, 'code':code, 'quantity':quantity})
	})
})

module.exports.app = app