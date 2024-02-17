const mongoose = require('mongoose');
const {database} = require('../config/database');


exports.userSchema = async()=>{
    database;
    const user = new mongoose.Schema({
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        birthDate:{
            type:String,
            required:true
    
        },
        gender:{
            type:String,
            requried:true
        },
        email:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            requried:true
        },
        address:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        confirmPassword:{
            type:String,
            required:true
        },
        token:{
            type:String || null,
            requried:true
        }
    
    },
    {timestamps:{
        createdAt:true,
        updatedAt:true
    }})
    return user;
}