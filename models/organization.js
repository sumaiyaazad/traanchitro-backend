const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    orgName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    contact:{
        phone:{
            type:String,
            required:true,
            trim:true,
            minLength:11,
            maxLength:14,
        },
        email:{
            type:String,
            trim:true,
        },
        website:{
            type:String,
            trim:true
        },
        facebook:{
            type:String,
            trim:true
        }
    }
});

module.exports = mongoose.model('Organization', organizationSchema);