import mongoose from "mongoose";
import { db } from "../constants";

const connectDB = async () => {
    try {
        const connection_instance = await mongoose.connect(`${process.env.MongoDB_URI}/${db.DB_NAME}`);


        console.log(`\n MongoDB connected! DB host : ${connection_instance.connection.host}`)
    }
    catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;