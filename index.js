//import express
const express = require('express');
const app = express();

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



//pug 
app.set("views","./views");
app.set("view engine","pug");

// App local variable
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});

