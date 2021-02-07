const express = require('express');
const router = express.Router();
const locationController=require('../controllers/location');

router.get(
  '/pins',
  locationController.getPins
);
module.exports=router;