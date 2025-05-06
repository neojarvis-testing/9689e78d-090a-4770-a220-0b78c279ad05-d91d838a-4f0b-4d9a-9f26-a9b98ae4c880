const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();  // Load environment variables from the .env file

const app = express();

/*
    The following middleware enables the server to parse incoming JSON requests.
    Without this, Express cannot process JSON request bodies properly.
    It ensures that data sent from the client as JSON is converted into a usable JavaScript object.
*/
app.use(express.json());

/*
    Establishes a connection to the MongoDB database using environment variables.
    The connection string is stored in `process.env.CONNECTION_URI` for security.
    
    `useNewUrlParser: true` ensures that the latest MongoDB URL parsing mechanism is used.
    `useUnifiedTopology: true` improves the management of MongoDB server discovery and monitoring.
*/
mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        /*
            Once the database connection is successful, the server starts listening on the defined port.
            The port number is retrieved from `process.env.SERVER_PORT`, allowing flexibility.
            
            The callback function inside `app.listen` logs a message to indicate the server is running.
        */
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });

        console.log('Database is Connected Successfully!');
    })
    .catch((error) => {
        /*
            If there is an error while establishing the database connection, it is caught here.
            This block logs the error details, making it easier to debug connection failures.
        */
        console.log('Database is Not Connected', error);
    });