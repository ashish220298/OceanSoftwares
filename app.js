const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/route')
require('./config/connect');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(router);
app.listen(port,()=>{
    console.log(`app is running on Port No: ${port}`)
})