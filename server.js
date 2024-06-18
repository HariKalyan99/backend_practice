import {v2 as cloudinary} from 'cloudinary'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToMongo from './db/connectToMongo.js';
import authRoute from './routes/auth.user.route.js'
import userRoute from './routes/user.route.js'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



const app = express();
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users", userRoute);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT || 8082}`);
    connectToMongo()
})