import mongoose from "mongoose";

let isConnected = false;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
    if (isConnected) return console.log("Already connected to MongoDB");

    try {
        await mongoose.connect(process.env.MONGODB_URL, { 
            dbName: environment === "production" ? "prod" 
                 : environment === "staging" ? "preprod" 
                 : "dev"
        });
        isConnected = true;
        console.log("Connected to MongoDB");          
    } catch (error) {
        console.log(error);
    }
}