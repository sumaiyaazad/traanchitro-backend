const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const activitySchema = new Schema({
    orgName: {
        type: String,
        required:true,
        trim:true,
        ref:'Organization'
    },
    typeOfRelief:[
        String,
    ],
    location:{
        lat:{
            type:Number,
            required:true
        },
        lng:{
            type:Number,
            required:true
        },
    },
    supplyDate:{
        type:Date,
        default:Date.now(),
    },
    contents:[{
        item:{type:String,trim:true},
        quantity:{type:String,trim:true},
        description:{type:String,trim:true}
    }]
});


module.exports = mongoose.model('activity', activitySchema);