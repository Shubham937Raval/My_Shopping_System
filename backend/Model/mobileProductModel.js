const mongoose = require('mongoose');
const mobileProductSchema = new mongoose.Schema({
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
    "Ratings": {
        type:String || Number,
        required:true
    }
});

module.exports = mongoose.model('mobiles',mobileProductSchema);