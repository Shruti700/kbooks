const express  = require('express')
const app = express();
const {connect}= require('./connection')
const staticRouter = require('./routes/staticRouter')
const Router = require('./routes/book')
const path = require("path");

connect();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',staticRouter);
app.use('/api',Router);

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log('Server started at port 7000')
});