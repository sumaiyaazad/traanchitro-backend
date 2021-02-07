const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const organizationController=require('../controllers/organization');


router.post(
  '/register',
    organizationController.postRegister
);
router.get(
  '/orgs',
  organizationController.getOrgs
);
router.patch(
  '/orgdetails',
  auth,
  organizationController.patchOrgdetails
);
module.exports=router;