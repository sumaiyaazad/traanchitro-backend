const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const activitySchema = new Schema({
    orgName: {
        type: String,
        required:true,
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
        item:String,
        quantity:String,
        description:String
    }]
});


module.exports = mongoose.model('activity', activitySchema);