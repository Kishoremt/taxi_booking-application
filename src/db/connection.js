var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/taxi");
module.exports=mongoose;