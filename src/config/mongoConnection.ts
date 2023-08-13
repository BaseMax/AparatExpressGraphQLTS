import mongoose from "mongoose";

export async function MongoConnection(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connect to database')
}