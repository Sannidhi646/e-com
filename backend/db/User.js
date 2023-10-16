const mongoose = require('mongoose');
 // Define the schema for the "products" collection
 const itemsSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
 });

 // Create the model (use the singular form of the collection name)
 module.exports= mongoose.model("user", itemsSchema);

