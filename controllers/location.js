const Activity = require('../models/activity')
const Organization=require('../models/organization')

exports.getPins = async (req, res, next) => {
    try {
        let locations;
        console.log("getPins req.query: ",req.query);
        let filter=JSON.parse(req.query.filter);
        console.log('hi');
        let bounds=JSON.parse(req.query.bounds);
        let orgNameArray=[];
        (await Organization.find({},'orgName -_id')).forEach(e=>orgNameArray.push(e.orgName));
        orgNameArray=(filter.orgName===null? orgNameArray : [filter.orgName]);
        let typeOfReliefArray=(filter.typeOfRelief.length===0?['FOOD','PPE','SANITIZER','MASK','GLOVE']:filter.typeOfRelief)
        let box=[[bounds.southwest.lat, bounds.southwest.lng], [bounds.northeast.lat, bounds.northeast.lng]]
        let sendObject={
            location:{$geoWithin:{$box:box}},
            typeOfRelief:{$in:[...typeOfReliefArray]},
            orgName:{$in:[...orgNameArray]},
        }
        if (filter.schedule === 'PAST') {
            locations = await Activity.find({
                ...sendObject,
                supplyDate: {$lte: Date.now()}
            }, 'location -_id').distinct('location');
            console.log("getPins if block")
        }
        else if(filter.schedule === 'SCHEDULED'){
            locations = await Activity.find({
                ...sendObject,
                supplyDate: {$gt: Date.now()}
            }, 'location -_id').distinct('location');
            console.log("getPins else if block")
        }
        else{
            locations = await Activity.find({
                ...sendObject
            }, 'location -_id').distinct('location');
            console.log("getPins else  block")
        }
        console.log('getPins locations: ', locations);
        return res.status(200).send({locations:locations})
    } catch (e) {
        console.log("getPins error: ", e);
        return res.status(500).send({message: "Sorry! Database Error"});
    }
}