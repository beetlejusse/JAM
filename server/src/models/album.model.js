import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
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
        artist: {
            type: String,
            required: true,
            index: true,
        },
        releaseYear: {
            type: Number,
            required: true
        },
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'Song',
        }],
    },
    { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema)