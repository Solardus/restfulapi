const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    Name: {type:String,default:""},
    Score: {type:Number,default:""}
})

const Score=mongoose.model('Score',scoreSchema);
module.exports=Score;