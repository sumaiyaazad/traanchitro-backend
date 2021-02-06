const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Activity = require('../models/activity')

exports.postLogin = async (req, res, next) => {
    try {
        let user = await User.findOne({username: req.body.username, password: req.body.password});
        if (!user) {
            return res.status(400).send({message: "Please insert valid username and password"});
        }
        let token = jwt.sign(
            {
                username: req.body.username
            },
            process.env.private_key,
        );
        let updatedUser = await user.updateOne({token: token});
        console.log("postLogin updatedUser: ", updatedUser);
        return res.status(200).send(token);
    } catch (e) {
        res.status(500).send({message: "Sorry! Database Error"})
    }
}
exports.postLogout = async (req, res, next) => {
    try {
        let user = await User.findOne({username: req.username});
        if (!user) {
            return res.status(400).send({message: "There is no user with username: " + req.username});
        }
        console.log("postLogout user: ", user);
        //await User.dropIndex('token');
        let updatedUser = await user.updateOne({token: ""});
        console.log("postLogout updatedUser: ", updatedUser);
        return res.status(200).send();
    } catch (e) {
        console.log("postLogout error: ", e);
        res.status(500).send({message: "Sorry! Database Error"})
    }
}
exports.postActivity = async (req, res, next) => {
    try {
        console.log(req.body);
        let activity = new Activity({
            ...req.body
        })
        console.log("postActivity activity: ", activity);
        let newActivity = await activity.save();
        console.log("postActivity newActivity: ", newActivity);
        return res.status(200).send();
    } catch (e) {
        console.log("postActivity error: ", e);
        res.status(500).send({message: "Sorry! Database Error"})
    }
}