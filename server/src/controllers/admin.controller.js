import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { uploadonCloudinary } from "../lib/cloudinary.js";

export const checkAdmin = (req, res, next) => {
    res.status(200).json({
        admin: true
    })
};

export const createSongs = async (req, res, next) => {
    try {
        if (!req?.files || !req?.files?.audioFiles || !req?.files?.imageFile) {
            return res.status(400).json({
                message: "Please upload all the necessary files first",
            });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFiles = req?.files.audioFiles;
        const imageFile = req?.files.imageFile;

        const audioUrl = await uploadonCloudinary(audioFiles);
        const imageUrl = await uploadonCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioURL: audioUrl,
            imageURL: imageUrl,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        //if song is related to album then update the album also
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }

        return res.status(201).json({
            message: "Song created succesfully",
            song,
        });
    } catch (error) {
        console.log("Error creating song check admin controller file");
        next(error);
    }
};

export const deleteSongs = async (req, res, next) => {
    try {
        const { id } = req.params;

        //if song belong to an album, update the album song array
        const song = await Song.findById(id);
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id },
            });
        }

        await Song.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Song deleted Successfully",
        });
    } catch (error) {
        console.log("Error in deleting song", error);
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req?.files;

        const imageUrl = await uploadonCloudinary(imageFile);
        const album = new Album({
            title,
            artist,
            imageURL: imageUrl,
            releaseYear,
        });

        await album.save();
        return res.status(201).json({
            message: "Album created succesfully",
            album,
        });
    } catch (error) {}
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;

        //also deleting the songs related to albums first
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Album deleted Successfully",
        });
    } catch (error) {
        console.log("Error in deleting album", error);
        next(error);
    }
};
