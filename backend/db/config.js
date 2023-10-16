
require('./User');
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/e-com", {
    useNewUrlParser: true,
   
});
console.log("Connected to the database successfully");
