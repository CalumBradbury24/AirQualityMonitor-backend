const express = require("express");
const cors = require("cors"); //Node.js package for providing express middleware
const morgan = require("morgan");
const compression = require("compression");
const path = require("path"); //Built in node module for manipulating path names
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

const errorHandlingMiddleware = require('./controllers/error-controller'); //Import global error handler
const dataRouter = require("./routes/data-route");
const app = express(); //Create express server

//MIDDLEWARES
console.log("Current environment is:", process.env.NODE_ENV);
app.use(cors()); //Middleware for connecting app to database
app.options("*", cors()); //Do this on all routes *
app.use(express.json({ limit: "10kb" })); //Middleware that allows for parsing json, only allow parsing req bodies of 10kb size or smaller - helps against Dos attacks
app.use(express.static(path.join(__dirname, "public"))); // Serve index.html in public folder on the home route

app.use(morgan("dev")); //Logs the incoming request method and route, response code, time it took to send back the response and size of the response in bytes


//Rate-limiting middleware to count number of requests from an IP address and block these requests when too many have been received
//Helps protect against DOS and brute force attacks
const limiter = rateLimit({
  max: 100, //Max number of requests allowed from an IP address in a given time window
  windowMs: 60 * 60 * 1000, //1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
//The rate-limit and rate-limit-remaining are sent in respoonse headers
app.use("/", limiter); //Apply this rate-limit to all routes on the / route

//Set some security HTTP headers
app.use(helmet());

//Data sanitisation against cross-site scripting attacks(XSS)
app.use(xss());

//Middleware to compress all text that is sent to clients on api responses
app.use(compression());

//ROUTES
app.use("/data", dataRouter);
/* 
//when a request is made using '/ in the request load index.html - route will go to which ever route matches first
app.use("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public" }); - handled below with 404 error and above with express.static(...)
});
*/


//Middleware to catch all routes that aren't handled by above routers, app.all() is all methods (get, post, patch, delete etc)
//This middleware is at the bottom so that it is only loaded if no other valid route has been found/matched
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`); //req.originalUrl is the url that was sent in the request
  error.status = "failed";
  error.statusCode = 404;
  next(error); //Send this error object to the error handling middleware
}); //* means all routes

//ERROR HANDLING MIDDLEWARE
//Use error handling middleware - this is where next(Error) goes to!
app.use(errorHandlingMiddleware); //Dont just write an error function in app.js, need it to be in a globally accessible function

module.exports = app;
