const Organization = require('../models/organization');
const Activity = require('../models/activity')

exports.getOrgdetails = async (req, res, next) => {
    try {
        let org = await Organization.findOne({orgName: req.query.orgName}, '-_id -__v')
        if (!org) {
            return req.status(400).send({message: "This organization is not registered yet."})
        }
        let activity = await Activity.find({orgName: req.query.orgName}, '-_id -__v');
        return res.send({organization: {...org._doc}, activities: [...activity]})
    } catch (e) {
        console.log("getOrgDetails error: ", e);
        return res.status(500).send({message: "Sorry! Database Error"})
    }
}
exports.getActivities = async (req, res, next) => {
    try {
        let activity;
        let filter=JSON.parse(req.query.filter);
        let location=JSON.parse(req.query.location);
        let orgNameArray=[];
        (await Organization.find({},'orgName -_id')).forEach(e=>orgNameArray.push(e.orgName));
        orgNameArray=(filter.orgName===null? orgNameArray : [filter.orgName]);
        let typeOfReliefArray=(filter.typeOfRelief.length===0?['FOOD','PPE','SANITIZER','MASK','GLOVE']:filter.typeOfRelief)
        let sendObject={
            typeOfRelief:{$in:[...typeOfReliefArray]},
            orgName:{$in:[...orgNameArray]},
            location:location
        }
        if(filter.schedule==='PAST'){
            activity=await Activity.find({
                ...sendObject,
                supplyDate: {$lte: Date.now()}
            })
        }
        else if(filter.schedule==='SCHEDULED'){
            activity=await Activity.find({
                ...sendObject,
                supplyDate: {$gt: Date.now()}
            })
        }
        else{
            activity=await Activity.find({
                ...sendObject
            })
        }
        return res.status(200).send({activities:activity});
    } catch (e) {
        console.log("getActivities error: ", e);
        res.status(500).send({message: "Sorry! Database Error"})
    }
}