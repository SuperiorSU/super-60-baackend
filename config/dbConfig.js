import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export const dbConnect = async ()=>{
   
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log('MongoDB connected successfully'))
        
        mongoose.connection.on('error',(err)=>{
            console.log('MongoDB connection error',err)
        })
    
}