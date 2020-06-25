const express = require('express');//Web application server framework
const cors = require('cors');//Node.js package for providing express middleware
const mongoose = require('mongoose');//Used to translate between objects in code and the representation of those objects in MongoDB

require('dotenv').config();//Allows use of environment variables in .env files

const app = express();//Create express server
const port = process.env.PORT || 5000; //Port the server runs on (if a port isnt recieved from the environment we are running in (e.g Heroku, run on port 5000) )

app.use(cors());//Middleware for connecting app to database
app.use(express.json());//Allow for parsing json when sending and recieving data

const uri = process.env.ATLAS_URI;//MongoDB Atlas database URI
//Connect to the database and set some necessary flags
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, dbName: "AirCluster" }
);
const connection = mongoose.connection;
connection.once('open', () => {
    //Log that the database connection was established sucessfully
  console.log("MongoDB database connection established successfully");
})

//Import the files
const sensorsRouter = require('./routes/sensors');

//when a request is made using '/ in the request, the sensors router file is loaded
app.use('/', sensorsRouter);

app.listen(port, () => {//Tell the server to start listening on the given port
    console.log(`Server is running on port: ${port}`);
});