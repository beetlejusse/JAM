import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        // Extracting the user data coming from Clerk
        const { id, firstName, lastName, imageUrl, email } = req.body;

        // Ensure all required fields are present
        if (!id || !email) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields" });
        }

        // Check for already existing users
        const existingUser = await User.findOne({ clerkId: id });

        if (!existingUser) {
            // Create new user
            const newUser = new User({
                clerkId: id,
                fullName: `${firstName} ${lastName || ""}`.trim(),
                imageURL: imageUrl,
                email
            });

            await newUser.save(); // Save new user to the database
            console.log(`User with Clerk ID: ${id} created successfully.`);
        } else {
            console.log(`User with Clerk ID: ${id} already exists.`);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in auth callback:", error);
        next(error);
    }
};
