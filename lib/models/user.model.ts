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
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
    }],
    onboarded: { type: Boolean, default: false },
    communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    }],
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
