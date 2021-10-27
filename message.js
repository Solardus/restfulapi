const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    Name: {type:String,default:""},
    Text: {type:String,default:""},
    Time: {type:Date,default:null}
})

const Message=mongoose.model('Messsage',messageSchema);
module.exports=Message;