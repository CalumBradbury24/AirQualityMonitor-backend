
const router = require('express').Router();
let Sensor = require('../models/sensor.model');

//Endpoint for incoming http GET requests on '/' URL path
router.route('/').get((req, res) => {
  Sensor.find()
    .then(sensors => res.json(sensors))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;//export router
