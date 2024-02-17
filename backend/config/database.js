const mongoose = require('mongoose');
require('dotenv').config({path:__dirname.toString()+'/.env'});

exports.database = ()=>{
    mongoose.connect(process.env.DATABASE).then(()=>{
        console.log("Database Connected...");
    }).catch(err=>{
        console.log("Database Connection error...");
    })
}