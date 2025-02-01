import {User} from "../models/user.model.js"
import { Message } from "../models/message.model.js"

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

export const getAllUserMessages = async(req, res, next) => {
    try {
        const myId = req.auth.userId
        const {userId} = req.params

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userId},
                {senderId: userId, receiverId: myId}
            ]
        }).sort({createdAt: 1})

        return res.status(200).json({
            message: "Messages fetched successfully",
            messages
        })
    } catch (error) {
        console.log("Error fetching user messages at user controller", error)
        next(error)
        
    }
}