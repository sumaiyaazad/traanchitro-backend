const Organization = require('../models/organization');
const Activity = require('../models/activity')

exports.getOrgdetails = async (req, res, next) => {
    try {
        let org = await Organization.findOne({orgName: req.query.orgName}, '-_id -__v')
        if (!org) {
            return req.status(400).send({message: "This organization is not registered yet."})
        }
        let activity = await Activity.find({orgName: req.query.orgName}, '-_id -__v');
        res.send({organization: {...org._doc}, activities: [...activity]})
    } catch (e) {
        console.log("getOrgDetails error: ", e);
        res.status(500).send({message: "Sorry! Database Error"})
    }
}
exports.getActivities = async (req, res, next) => {
    try {
        let activity;
        console.log('getActivities req.query: ',req.query.filter.schedule);
        if (req.query.filter.schedule === 'PAST') {
            activity = await Activity.find({
                    typeOfRelief: {$in: [...req.query.filter.typeOfRelief]},
                    orgName: req.query.filter.orgName,
                    location: req.query.location,
                    supplyDate: {$lte: Date.now()}
                },
                '-_id -__v')
            return res.send({activities: [...activity]})
        }
        activity = await Activity.find({
                typeOfRelief: {$in: [...req.query.filter.typeOfRelief]},
                orgName: req.query.filter.orgName,
                location: req.query.location,
                supplyDate: {$gt: Date.now()}
            },
            '-_id -__v')
        return res.send({activities: [...activity]})
    } catch (e) {
        console.log("getActivities error: ", e);
        res.status(500).send({message: "Sorry! Database Error"})
    }
}