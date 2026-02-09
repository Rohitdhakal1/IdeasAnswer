import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongodb);
        console.log("mongodb connected");
    } catch(error){
        console.log("mongodb connection failed");
        process.exit(1);
    }
}

export default connectDB;