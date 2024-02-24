const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String
        },
        imgURL:{
            type:String,
            default:"https://cdn.pixabay.com/photo/2020/08/08/02/56/hacker-5471975_640.png"
        },
        birthDate:{
            type:String
    
        },
        gender:{
            type:String
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
            type:String
        },
        pincode:{
            type:Number
        },
        password:{
            type:String,
            required:true
        },
        confirmPassword:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"Sub-Admin"
        },
        token:{
            type:String || null,
            default:null
        },
        failedLogins:{
            type : Object,
            value : {
                Date : {
                    type : Date
                },
                ip : {
                    type : Object
                }
            }
        },
        logins:{
            type : Object,
            value : {
                Date : {
                    type : Date
                },
                ip : {
                    type : Object
                }
            }
        }
    
    },
    {
        timestamps:{
        createdAt:true,
        updatedAt:true
        }
    })
module.exports = mongoose.model('admin',adminSchema);
