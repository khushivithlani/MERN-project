const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Handling uncaught Exeption
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled Promise rejection")
    process.exit(1);
})

//config
dotenv.config({path:'backend/config/config.env'})

//connect to database
connectDatabase()

const server = app.listen(process.env.PORT, () =>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

//unhandled promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled Promise rejection")

    server.close(() =>{
        process.exit(1)
    })
})