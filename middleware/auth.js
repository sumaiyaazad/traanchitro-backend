const jwt = require('jsonwebtoken');
const User=require('../models/user');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth');
    //console.log("auth token from user: ",token);
    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, process.env.private_key);
        //console.log("auth decodedToken: ",decodedToken);
        if (!decodedToken) {
            return res.status(400).send({message:"Sorry! Your are not authenticated"});
        }
        let user=await User.findOne({token:token});
        if(decodedToken.username!==user.username || decodedToken.orgName!==user.orgName){
            return res.status(400).send({message:"Sorry! Your are not authenticated"});
        }
        req.username = decodedToken.username;
        req.orgName=decodedToken.orgName;
        next();
    } catch (e) {
        return res.status(400).send({...e,"message":"Invalid Authentication"});
    }

};