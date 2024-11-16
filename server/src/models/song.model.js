import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
    {
        title: {
            type: String,
            requires: true,
            index: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        audioURL: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
            index: true,
        },
        duration: {
            type: Number,
            required: true
        },
        albumId: {
            type: Schema.Types.ObjectId,
            ref: 'Album',
            required: false,
        },
    },
    { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema)