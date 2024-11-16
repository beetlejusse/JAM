import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}`
        );
        console.log(
            `\n Mongo DB Connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("Mongo Db Connection failed with an error", error);
        process.exit(1);
    }
};

export default dbConnect;
