const {Schema, model} = require("mongoose")


const UserSchema = new Schema({
    title:{type:String, required:true, trim:true,},
    users:[],
    date: { type: Date, default: Date.now }
})

module.exports = model("Groups", UserSchema)