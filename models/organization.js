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
        },
        website:{
            type:String,
        },
        facebook:{
            type:String,
        }
    }
});

module.exports = mongoose.model('Organization', organizationSchema);