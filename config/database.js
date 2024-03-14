const mongoose = require('mongoose');
//init connect funciton
module.exports.connect = async ()=>{
    try{
     await mongoose.connect(process.env.mongoURL);
     console.log("Connect success")
    }
    catch(error){
    console.log("Connect Error")
    }
}
