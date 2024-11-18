import { User } from "../models/user.model.js";

export const authCallback = async(req, res, next) => {
    try {
        
        //Pushiong the user coming from clerk to our database
        const {id, firstName, lastName, imageUrl, email} = req.body;

        //check for already existed users
        const user = await User.findOne({
            $or: [{clerkId: id}, {email}]
        })

        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                email,
                imageUrl
            })
        }

        res.status(200).json({success:true})
    } catch (error) {
        console.log("Error in auth callback", error)
        next(error)
    }
}