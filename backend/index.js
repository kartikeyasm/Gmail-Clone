import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.routes.js';
import emailRoute from './routes/email.routes.js';

const app = express();
const PORT = 8000;
const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
}

const startServer =async () => {
    try{
        await connectDB();
        app.on("Error", (error)=>{
            console.log("Error", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is listening on ${process.env.PORT || 8000}`);    
        });
    }
    catch(err){
        console.log("Mongo DB connection failed!!!", err);
    }
}
startServer();


//Express Setup
app.use(cors(corsOptions)); // CORS setup
app.use(express.json({limit: "16kb"}));  //To handle JSON data from forms
app.use(express.urlencoded({extended: true, limit: "16kb"})); //To handle URL data
app.use(cookieParser()) //Cookie Setup


app.use('/api/v1/user', userRoute);
app.use('/api/v1/email', emailRoute);
