const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    questions:{
        type:[String],
        required:true,
        minlength:5
    }
});

const trackModel = mongoose.model("track",trackSchema);
module.exports =trackModel;