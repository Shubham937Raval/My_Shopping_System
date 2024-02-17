const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    "Product_Category" : {
        type:String
    }
})

module.exports = new mongoose.model('category',CategorySchema);