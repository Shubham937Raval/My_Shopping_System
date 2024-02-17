const mongoose = require('mongoose');
const isSoldProductSchema = new mongoose.Schema({
    "Order_ID":{
      type:String,
      required:true
    },
    "Product_ID":{
      type:String,
      required:true
    },
    "Product_Category":{
      type:String,
      required:true
    },
    "Quantity":{
      type : Number,
      required : true
    },
    "Unit_Price": {
        type:Number,
        required:true
    },
    "Total_Price": {
        type:Number,
        required:true
    },
    "Order_Date": {
        type:Date,
        required:true
    },
    "Customer_ID": {
        type:String,
        required:true
    },
    "Payment_Type": {
        type:String,
        required:true
    },
    "Order_Status": {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('issolds',isSoldProductSchema);