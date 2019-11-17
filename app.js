const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/alinas', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.log(`Unable to Connect MongoDB : ${err}`))

app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'public')))

const storeCode = { 'W':1, 'H':2, 'I':3, 'T':4, 'E':5, 'B':6, 'L':7, 'A':8,'C':9, 'K':0, 'w':1, 'h':2, 'i':3, 't':4, 'e':5, 'b':6, 'l':7, 'a':8,'c':9, 'k':0 }

const storeSchema = new mongoose.Schema({
	item: String, 
	size: String,
    code: String,
    price: Number,
    quantity: Number,
	total_price: Number,
	ttl: Number
});

const Store = mongoose.model('clothes', storeSchema);

var amt = []
var grand_total = 0

async function getTotal() {
	const data = await Store.find()
	data.forEach(ele => {
		amt.push(ele.total_price)
	})
	grand_total = amt.reduce((a, b,) => a+b , 0)
}

getTotal()
// var ttl_amt = 0

// function cal() {
// 	const res = amt.reduce((a+b), 0)
// 	console.log(res)
// }

app.get('/', (_req, res) => {
	res.render('home')
	//cal()
})

app.get('/view/stocks', (_req, res) => { 
	Store.find().then((sData) => res.render('data', {'items' : sData , 'ttl':grand_total}))
})

app.get('/edit/stocks', (_req, res) => {
	Store.find().then((sData) => res.render('stocks', {'items' : sData}))
})
var id = '0bxecedddd'
app.post('/edit/stocks', (req, res) => { 
	for(key in req.body) {
		id = key
	}
		Store.findOne({_id:id}).then((sData) => {
		const item = sData.item
		const size = sData.size
		var code = sData.code
		var quantity = sData.quantity
		res.render('stockForm', {'item':item, 'size':size, 'code':code, 'quantity':quantity})
	})
})

app.get('/insert/stockForm', (_req, res) => {
	res.render('insertStock')
})

app.post('/insert/stockForm', (req, res) => {
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
		size: data.size,
		code: data.code,
		price: pr,
		quantity: data.quantity,
		total_price: ttl
	})
	store.save().then(res.render('insertStock'))	
})

app.get('/edit/stockForm', (req, res) => {
	// for(key in req.body) {
	// 	id = key
	// }
		Store.findOne({_id:'5dcd3bc6deb7c92e7053566b'}).then((sData) => {
		const item = sData.item
		const size = sData.size
		var code = sData.code 
		var quantity = sData.quantity
		res.render('stockForm', {'item':item, 'size':size, 'code':code, 'quantity':quantity})
	})
	console.log(req.body)
})

app.post('/edit/stockForm', (req, res) => {
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
			size:data.size,
			code:data.code,
			price:pr,
			quantity:quant,
			total_price:ttl
		}
	}).then(res.render('home'))
	.catch((err) => console.log(err))
})

app.get('/delete/stock', (req,res) => {
	Store.find().then((sData) => res.render('dStocks', {'items' : sData}))
	.catch(err => console.log(err))
})

// app.post('/delete/stock', (req,res) => {
// 	for(key in req.body) {
// 		id = key
// 	}
// 	Store.findOne({_id:id}).then((sData) => {
// 		const item = sData.item
// 		var code = sData.code
// 		var quantity = sData.quantity
// 		res.render('deleteStock', {'item':item, 'code':code, 'quantity':quantity})
// 	})
// 	.catch((err) => console.log(err))
// })

app.get('/delete/stockForm', (req,res) => {
	for(key in req.body) {
		id = key
	}

	Store.findOne({_id:id}).then((sData) => {
		const item = sData.item
		const size = sData.size
		var code = sData.code
		var quantity = sData.quantity
		res.render('deleteStock', {'item':item, 'size': size, 'code':code, 'quantity':quantity})
		})
		.catch((err) => console.log(err))
})

app.post('/delete/stockForm', (req,res) => {
	for(key in req.body) {
		id = key
	}

	Store.deleteOne({_id:id}).then(res.render('home'))
	.catch(err => console.log(err))
	console.log(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/7.4.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/7.4.0/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>