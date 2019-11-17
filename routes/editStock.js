
const express = require('express')
const app = express.Router()
const con = require('../model/connection')
const storeSchema = require('../model/schema')

const Store = con.model('alinas', storeSchema)

app.get('/', (_req, res) => {
	res.render('stockForm')
})

app.post('/', (req, res) => {
	const data = req.body.st
	let price =[]
	let code = []
	let quant = data.quantity
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

	Store.updateOne({_id:id},{
		$set: {
			item:data.item_name,
			code:data.code,
			price:pr,
			quantity:quant,
			total_price:ttl
		}
	}).then(res.render('home'))
	.catch((err) => console.log(err))
})

module.exports.app = app