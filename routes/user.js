const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const userController=require('../controllers/user');


router.post(
    '/login',
    userController.postLogin
);
router.post(
    '/logout',
    auth,
    userController.postLogout
);
router.post(
    '/activity',
    auth,
    userController.postActivity
);
module.exports=router;