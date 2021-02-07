const Activity = require('../models/activity')

exports.getPins = async (req, res, next) => {
    try {
        let locations;
        console.log("getPins req.query: ",req.query);
        if (req.query.filter.schedule === 'PAST') {
            locations = await Activity.find({
                'location':
                    {'$geoWithin': {$box: [[req.query.bounds.southwest.lng, req.query.bounds.southwest.lat], [req.query.bounds.northeast.lng, req.query.northeast.lat]]}},
                typeOfRelief: {$in: [...req.query.filter.typeOfRelief]},
                orgName: req.query.filter.orgName,
                supplyDate: {$lte: Date.now()}
            }, 'location -_id');
            console.log("getPins if block")
        }
        else{
            locations = await Activity.find({
                'location':
                    {'$geoWithin': {$box: [[req.query.bounds.southwest.lng, req.query.bounds.southwest.lat], [req.query.bounds.northeast.lng, req.query.northeast.lat]]}},
                typeOfRelief: {$in: [...req.query.filter.typeOfRelief]},
                orgName: req.query.filter.orgName,
                supplyDate: {$gt: Date.now()}
            }, 'location -_id');
            console.log("getPins else block")
        }
        console.log('getPins locations: ', locations);
        return res.status(200).send(locations)
    } catch (e) {
        console.log("getPins error: ", e);
        res.status(500).send({message: "Sorry! Database Error"});
    }
}