const mongoose = require('mongoose');
const laptopProductSchema = new mongoose.Schema({
    "Product_Name":{
      type:String,
      required:true
    },
    "Price":{
      type:String,
      required:true
    },
    "Original_Prices":{
      type:String,
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

module.exports = mongoose.model('laptop',laptopProductSchema);