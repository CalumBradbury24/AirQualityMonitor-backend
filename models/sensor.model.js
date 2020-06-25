const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define the model schema
const sensorSchema = new Schema({
    sensorID: {//SensorID must be a string and is required
        type: Number,
        required: true,
    },
    PMOne: {                        //1.0 particulate matter
        type: Number,
    },
    PMTwoFive: {                    //2.5
        type: Number,
    },
    PMTen: {
        type: Number,
    },
    NoOfPartsGreaterThanPointThree: {
        type: Number,
    },
    NoOfPartsGreaterThanPointFive: {
        type: Number,
    },
    NoOfPartsGreaterThanOne: {
        type: Number,
    },
    NoOfPartsGreaterThanTwoFive: {
        type: Number,
    },
    NoOfPartsGreaterThanFive: {
        type: Number,
    },
    TemperatureDHT11: {
        type: Number,
    },
    HumidityDHT11: {
        type: Number,
    },
    date: {
        type: Date,
    }
    
});

const SensorReading = mongoose.model('Sensor Reading', sensorSchema);
module.exports = SensorReading;//export the model

