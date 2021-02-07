const Activity = require('../models/activity')

exports.getPins = async (req, res, next) => {
    try {
        let locations;
        console.log("getPins req.query: ",req.query);
        let filter=JSON.parse(req.query.filter);
        let bounds=JSON.parse(req.query.bounds);
        let box=[[bounds.southwest.lng, bounds.southwest.lat], [bounds.northeast.lng, bounds.northeast.lat]]
        if (filter.schedule === 'PAST') {
            locations = await Activity.find({
                'location':
                    {'$geoWithin': {$box:box }},
                typeOfRelief: {$in: [...filter.typeOfRelief]},
                orgName: filter.orgName,
                supplyDate: {$lte: Date.now()}
            }, 'location -_id');
            console.log("getPins if block")
        }
        else{
            locations = await Activity.find({
                'location':
                    {'$geoWithin': {$box: box}},
                typeOfRelief: {$in: [...filter.typeOfRelief]},
                orgName: filter.orgName,
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