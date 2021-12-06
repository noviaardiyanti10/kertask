const express = require('express');
const path = require('path');
const app = express();
const router = require('./router/route');
const { PORT = 8000 } = process.env;


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'view')));
app.set('view engine', 'ejs');


//set body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));