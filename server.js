const express = require('express');
const path = require('path');
const app = express();
const router = require('./router/route');
const flash = require('connect-flash');
const session = require("express-session");
const logger = require("./middleware/logger");

const { PORT = 8000 } = process.env;

app.use(session({
    secret: 'secret word in use',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 43200000
    }
}));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages = req.flash();
    next();
});




app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'view')));
app.set('view engine', 'ejs');


//set body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger)
app.use(router)




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));