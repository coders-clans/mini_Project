const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }
});

const userModel = mongoose.model("user",schema);
module.exports =userModel;