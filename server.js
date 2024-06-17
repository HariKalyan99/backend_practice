import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import connectToMongo from './db/connectToMongo.js';
dotenv.config();

import authRoute from './routes/auth.user.route.js'


const app = express();
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth/",authRoute)


app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
    connectToMongo()
})