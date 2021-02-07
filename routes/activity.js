const express = require('express');
const router = express.Router();
const activityController=require('../controllers/activity');

router.get(
    '/orgdetails',
    activityController.getOrgdetails
);
router.get(
    '/activities',
    activityController.getActivities
)
module.exports=router;