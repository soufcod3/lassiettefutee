import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    // objectId: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
