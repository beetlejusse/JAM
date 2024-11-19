import { Album } from "../models/album.model.js"

export const getAllAlbums = async(req, res, next) => {
    try {
        const albums = await Album.find()
        return res.status(200).json({
            message: "all albums fetched successfully", albums
        })
    } catch (error) {
        console.log("Error finding album", error)
        next(error)
    }
}

export const getAlbumById = async(req, res, next) => {
    try {
        const {albumId} = req.params

        const album = await Album.findById(albumId).populate("songs")
        if(!album){
            return res.status(404).json({
                message: "Album Not Found"
            })
        }
        
        return res.status(200).json({
            message: "Successfully fetched album", album 
        })
    } catch (error) {
        console.log("error fetching album by id", error)
        next(error)
    }
}