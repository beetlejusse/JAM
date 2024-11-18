import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            requires: true,
            index: true,
        },
        email: {
            type: String,
            requires: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema)