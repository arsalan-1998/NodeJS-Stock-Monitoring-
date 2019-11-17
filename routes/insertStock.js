
const express = require('express')
const app = express.Router()
const mongoose = require('../model/connection')
const storeSchema = require('../model/schema')

const Store = mongoose.model('alinas', storeSchema)

app.get('/', (_req, res) => {
	res.render('insertStock')
})

app.post('/', (req, res) => {
	const price =[]
	const data = req.body.stock
	const quant = data.quantity
	code = data.code.split('')
	code.forEach(e => {
		for(i in storeCode) {
			if(i === e) {
				price.push(storeCode[i])
			}
		}
	});
	const pr = price.join('')
	const ttl = parseInt(quant*pr)
	const store = new Store({
		item: data.item_name,
		code: data.code,
		price: pr,
		quantity: data.quantity,
		total_price: ttl
	})
	store.save().then(res.render('insertStock'))	
})

module.exports.app = app