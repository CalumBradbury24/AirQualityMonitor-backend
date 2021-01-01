const sensorModel = require("../models/sensor.model");

const getData = async (req, res, next) => {
  try {
    const document = await sensorModel.find();
    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

 

module.exports = {
    getData
};