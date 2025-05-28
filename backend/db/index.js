import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB successfully");
    }catch(err){
        console.error("Error connecting to the database:", err);
        throw err;
    }
}

export default connectDB;