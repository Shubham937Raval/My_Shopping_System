const mongoose = require('mongoose');
const furnProductSchema = new mongoose.Schema({
    "Product_Name":{
      type:String,
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

module.exports = mongoose.model('furns',furnProductSchema);