const mongoose = require('mongoose');
const bookProductSchema = new mongoose.Schema({
    "Product_Name":{
      type:String || Number,
      required:true
    },
    "Price":{
      type:Number || String,
      required:true
    },
    "Original_Prices":{
      type:Number || String,
      required:true
    },
    "Discount_rates":{
      type : String,
      required : true
    }
});

module.exports = mongoose.model('books',bookProductSchema);