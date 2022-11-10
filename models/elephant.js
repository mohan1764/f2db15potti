const mongoose = require("mongoose")
const elephantSchema = mongoose.Schema({
    elephant_color:(String),
    elephant_breed:(String),
    elephant_price:(Number)
})
module.exports = mongoose.model("elephant",
elephantSchema)