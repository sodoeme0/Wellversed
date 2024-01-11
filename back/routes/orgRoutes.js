const express = require('express')
const router = express.Router()
const organizationController = require('../controller/organizationController')


//get all organizations
router.get('/', organizationController.getAllOrganizations)

//get organization
router.get("/organization/:email", organizationController.getOrganization)

router.post("/login", organizationController.login)

router.post("/logout", organizationController.logOut)

router.post("/signup", organizationController.signUp)

  
module.exports = router