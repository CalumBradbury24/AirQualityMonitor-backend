require("dotenv").config({ path: "./config.env" }); //Allows use of environment variables in .env files
const mongoose = require("mongoose"); //Used to translate between objects in code and the representation of those objects in MongoDB

const app = require("./app");

//HANDLE UNCAUGHT EXCEPTIONS -synchronous errors such as console.log(undefinedVariable) - at top of code so that all errors that come after are caught (otherwise errors before this will be missed/uncaught!)
//Listen to uncaughtException event
process.on("uncaughtException", (error) => {
  //Event listener
  console.log("UNCAUGHT EXCEPTION!..server closing down.");
  console.log(error.name, error.message); //Catch and log the error name and message
  process.exit(1);
});

const DB_URI = process.env.ATLAS_URI; //MongoDB Atlas database URI

mongoose //Connect to mongodB database
  .connect(DB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 5000; //Logical OR evaluates to the port value that is true, if a port isnt recieved from the environment we are running in (e.g Heroku, run on port 5000) )
app.listen(port, (error) => {
  //Tell the server to start listening on the given port
  if (error) throw error; //Error checking
  console.log(`Server is running on port: ${port}`);
});

//HANDLE UNHANDLED PROMISE REJECTIONS/asynchronous errors - Deal with unhandled promise rejections such as a failure to connect to the database etc
//subscribe to the unhandledRejection event listener
process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED REJECTION!..server closing down.");
  console.log(error.name, error.message); //Catch and log the error name and message
  server.close(() => {
    //Server.close gives the server time to finish all the requests that are still processing/pending before closing
    process.exit(1); //Kill server with error code 1(uncaught exception)
  });
});

//An event that can be emmited by heroku and cause the app to close
process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    //Close server gracefully by allowing currently processing requests to complete
    process.exit(1);
  });
});
