require('dotenv').config();
const mongoose = require('mongoose');
const cors=require('cors');
const express = require('express');
const feedRouter=require('./routers/feedRouter');
const livestockRouter = require('./routers/liveStockRouter')
const userRouetr=require('./routers/userRouter');
const requestRouter=require('./routers/requestRouter');
const app = express();
app.use(cors({
    origin:'https://8081-accecafecdeeafbaaaafafeddafbdafabaec.premiumproject.examly.io',
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders:['Content-Type','authentication'],
    exposedHeaders:['Content-Type','X-Powered-By'],
    credentials:false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/feed',feedRouter);
/*
The following middleware enables the server to parse incoming JSON requests.
Without this, Express cannot process JSON request bodies properly.
It ensures that data sent from the client as JSON is converted into a usable JavaScript object.
*/
app.use('/livestock',livestockRouter);

/*
    Establishes a connection to the MongoDB database using environment variables.
    The connection string is stored in `process.env.CONNECTION_URI` for security.
    
    `useNewUrlParser: true` ensures that the latest MongoDB URL parsing mechanism is used.
    `useUnifiedTopology: true` improves the management of MongoDB server discovery and monitoring.
*/
app.use('/liveStock',livestockRouter)
app.use('/feed',feedRouter)
app.use('/user',userRouetr)
app.use('/request',requestRouter)
mongoose.set('strictQuery', true).connect('mongodb://127.0.0.1:27017/farmconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        /*
            Once the database connection is successful, the server starts listening on the defined port.
            The port number is retrieved from `process.env.SERVER_PORT`, allowing flexibility.
            
            The callback function inside `app.listen` logs a message to indicate the server is running.
        */
       console.log('Database is Connected Successfully!');
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });

    })
    .catch((error) => {
        /*
            If there is an error while establishing the database connection, it is caught here.
            This block logs the error details, making it easier to debug connection failures.
        */
        console.log('Database is Not Connected', error);
    });