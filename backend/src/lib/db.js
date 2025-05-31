import mongoose from 'mongoose';


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB is connected');
        
    } catch(error) {
        console.log('Database error' + error );
        
    }
}