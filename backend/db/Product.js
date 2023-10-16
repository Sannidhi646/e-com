const mongoose = require('mongoose');
 // Define the schema for the "products" collection
 const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userid:String,
    company:String

 });

 // Create the model (use the singular form of the collection name)
 module.exports= mongoose.model("product", productSchema);

