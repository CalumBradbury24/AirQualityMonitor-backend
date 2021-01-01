const express = require("express");
const router = express.Router(); //New express router 
const dataController = require('../controllers/data-controller');

router.route("/").get(dataController.getData);

module.exports = router;