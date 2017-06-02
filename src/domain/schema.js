var mongoose=require("../db/connection.js");
var schema=mongoose.Schema({
	driverName:String,
	driverNumber:Number,
	vehicleNumber:Number,
	vehiclecolor:String
});
var taxiSchema=mongoose.model("taxi",schema);
module.exports=taxiSchema;