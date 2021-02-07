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
        console.log('getActivities query: ',filter.schedule);
        if (filter.schedule === 'PAST') {
            activity = await Activity.find({
                    typeOfRelief: {$in: [...filter.typeOfRelief]},
                    orgName: filter.orgName,
                    location: location,
                    supplyDate: {$lte: Date.now()}
                },
                '-_id -__v')
            return res.send({activities: [...activity]})
        }
        activity = await Activity.find({
                typeOfRelief: {$in: [...filter.typeOfRelief]},
                orgName: filter.orgName,
                location: location,
                supplyDate: {$gt: Date.now()}
            },
            '-_id -__v')
        return res.send({activities: [...activity]})
    } catch (e) {
        console.log("getActivities error: ", e);
        res.status(500).send({message: "Sorry! Database Error"})
    }
}