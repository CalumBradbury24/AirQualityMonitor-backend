//Probably dont need the post requests since this is handled in python?
const router = require('express').Router();
let Sensor = require('../models/sensor.model');

//Endpoint for incoming http GET requests on '/' URL path
router.route('/').get((req, res) => {//where the request comes from?e.g front-end on heroku
  Sensor.find()
    .then(sensors => res.json(sensors))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;//export router