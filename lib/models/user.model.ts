import mongoose from "mongoose";

// User combined from clerk and db
export interface IUserData {
    id: string;
    objectId: string | undefined;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
}

export interface IUserDb {
    _id: string | undefined;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
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
