import { Song } from "../models/song.model.js";

export const getAllSong = async (req, res, next) => {
    try {
        // oldest song in last and newest above
        const songs = await Song.find().sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Fetched Songs Successfully",
            songs,
        });
    } catch (error) {
        console.log("error fetching all songs", error);
        next(error);
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try {
        //fetch 6 random songs using mongoDB aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    iamgeURL: 1,
                    audioURL: 1,
                },
            },
        ]);

        return res.status(200).json({
            message: "Featured Songs Fetched Successfully",
            songs,
        });
    } catch (error) {
        console.log("error fetching featured songs", error);
        next(error);
    }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        //fetch 6 random songs using mongoDB aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    iamgeURL: 1,
                    audioURL: 1,
                },
            },
        ]);

        return res.status(200).json({
            message: "Made for You songs Fetched Successfully",
            songs,
        });
    } catch (error) {
        console.log("error fetching made-for-you songs", error);
        next(error);
    }
};

export const getTrendingSongs = async (req, res, next) => {
    try {
        //fetch 6 random songs using mongoDB aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    iamgeURL: 1,
                    audioURL: 1,
                },
            },
        ]);

        return res.status(200).json({
            message: "Trending songs Fetched Successfully",
            songs,
        });
    } catch (error) {
        console.log("error fetching trending songs", error);
        next(error);
    }
};
