
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Home = require('../alinaStore/Home/index');
const Stock = require('../alinaStore/routes/stocks');
const editStock = require('../alinaStore/routes/manageStock');
const insertStock = require('../alinaStore/routes/insertStock');
const editstockForm = require('../alinaStore/routes/editStock');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'blah_blah', 
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

app.use('/', Home);
app.use('/view/stock', Stock);
app.use('/edit/stock', editStock);
app.use('/insert/stockForm', insertStock);
app.use('/edit/stockForm', editstockForm);

const port = process.env.port || 3000;
app.listen(port, (error) => {
    if(error) throw error;
    console.log(`listening on port ${port}...`);
});