const express = require('express');
require('dotenv').config(); 

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Products-Management")

const route = require('./routes/client/index.route.js');



const app = express();
const port = process.env.PORT;

app.set("views","./views");
app.set("view engine","pug");

route(app)

app.use(express.static("public"))

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});
