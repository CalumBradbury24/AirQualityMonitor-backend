//with these four arguments express automatically registers this middleware as an error handling middleware
const errorHandler = ((error, req, res, next) => {
    res.status(error.statusCode).json({
      //Send back error message in json format
      status: error.status, //Status code
      message: error.message //Actual error message
    });
    next();
  });
  
module.exports = errorHandler;  