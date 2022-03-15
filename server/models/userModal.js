const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    name:{type:String, required:true, trim:true,},
    surname:{type:String, required:true, trim:true,},
    groups:[],
    date: { type: Date, default: Date.now }
})


module.exports = model("User", UserSchema)