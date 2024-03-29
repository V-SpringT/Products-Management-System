
//import express
const express = require('express');
const app = express();

// import method-override 
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// import body parser
const  bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

// import cookie-parser and express-session 
const cookieParser = require("cookie-parser");
const session = require("express-session")

//import express-flash // noitification
const flash = require("express-flash")
app.use(cookieParser('keyboard cat')); // install cookieParser
app.use(session({ cookie: { maxAge: 60000 }}));// install express session
app.use(flash());


//import .evn
require('dotenv').config(); 
const port = process.env.PORT;

// import db
const database = require("./config/database.js")
database.connect()

//create model mongoose config objectMongo


//import route
const route = require('./routes/client/index.route.js');
route(app)

const routeAdmin = require('./routes/admin/index.route.js');
routeAdmin(app)

// static public folder
app.use(express.static("public"))

// import multer # upload image

const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

//pug 
app.set("views","./views");
app.set("view engine","pug");

// App local variable
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});

