import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.routes.js';
import emailRoute from './routes/email.routes.js';

dotenv.config();

connectDB();
const app = express();
const PORT = 8000;
const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
}

//Express Setup
app.use(cors(corsOptions)); // CORS setup
app.use(express.json({limit: "16kb"}));  //To handle JSON data from forms
app.use(express.urlencoded({extended: true, limit: "16kb"})); //To handle URL data
app.use(cookieParser()) //Cookie Setup



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get('/home', (req,res)=>{
    return res.status(200).json({
        message: 'Backend is running',
        sucess: true
    })
})


app.use('/api/v1/user', userRoute);
app.use('/api/v1/email', emailRoute);
