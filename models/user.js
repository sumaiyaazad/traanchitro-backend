const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minLength:5,
    },
    token: {
        type:String,
        trim:true,
        default:"",
    },
});

module.exports = mongoose.model('User', userSchema);