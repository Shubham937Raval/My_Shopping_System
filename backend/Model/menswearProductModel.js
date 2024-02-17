const mongoose = require('mongoose');
const menswearProductSchema = new mongoose.Schema({
    "Product_Name":{
      type:String,
      required:true
    },
    "Price":{
      type:String || Number,
      required:true
    },
    "Original_Prices":{
      type:String || Number,
      required:true
    },
    "Discount_rates":{
      type : String,
      required : true
    },
    "Brand": {
        type:String,
        required:true
    },
    "Image_URLS":{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('mens_wear_clothes',menswearProductSchema);