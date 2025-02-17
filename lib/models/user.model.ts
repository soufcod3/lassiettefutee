import mongoose from "mongoose";

// User combined from clerk and db
export interface IUserData {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
}

export interface IUserDb {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
    phoneVerified: boolean;
}

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    objectId: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    phoneVerified: { type: Boolean, default: false },
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
