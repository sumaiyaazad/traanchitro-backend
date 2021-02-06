const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    orgName:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    contact:{
        phone:{
            type:String,
            required:true,
            minLength:11,
            maxLength:11,
        },
        email:{
            type:String,
            required:true,
        },
        website:{
            type:String,
            default:'https://www.google.com',
        },
        facebook:{
            type:String,
            default:'https://www.facebook.com',
        }
    }
});

module.exports = mongoose.model('Organization', organizationSchema);