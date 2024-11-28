import {User} from "../models/user.model.js"

export const getAllUser = async(req, res, next) => {
    try {
        const currUserId = req.auth.userId
        const users = await User.find({clerkId: {$ne: currUserId}})
        return res.status(200).json({
            message: "User fetched succesfully", users
        })
    } catch (error) {
        console.log("Error fetching user at user controller", error)
        next(error)
    }
}