const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    Name: {type:String,default:""}
})

const Profile=mongoose.model('Profile',profileSchema);
module.exports=Profile;