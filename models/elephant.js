const mongoose = require("mongoose")
const elephantSchema = mongoose.Schema({
    elephant_color:String,
    elephant_breed:{type:String,length:20},
    elephant_price:{type:Number,min:1000,max:100000}
})
module.exports = mongoose.model("elephant",elephantSchema)