import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/lib/db.js';
import cors from 'cors'
import authRout from './src/route/Auth.route.js'

dotenv.config()
const PORT =process.env.PORT||5001

const app= express()
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

connectDB()

app.use("/auth",authRout)
app.listen(PORT, ()=>{
    console.log('Server is running on port'+PORT);
    
})