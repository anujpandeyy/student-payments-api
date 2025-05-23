const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("MongoDB connected successfully ✅");
    }catch(error){
        console.error("MongoDB connection failed ❌", error);
    }
}

module.exports = connectDB;