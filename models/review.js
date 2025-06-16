const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const reviewSchema = new Schema({
    title:{
        type: String,
        default: "Anonymous"
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    comment:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports =  mongoose.model("Review",reviewSchema);
