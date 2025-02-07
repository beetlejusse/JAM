import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import dbConnect from "./lib/db.js";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./lib/Socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

//building socket io server on top of express server
const httpServer = createServer(app)
initializeSocket(httpServer)

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(clerkMiddleware()); //will add auth to req object => req.auth

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "temp"),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024, //max file size of 10 mb
        },
    })
);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

//error handling
app.use((err, req, res, next) => {
    return res.status(500).json({
        message:
            process.env.NODE_ENV === "production"
                ? "Internal Server Error"
                : err.message,
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
    dbConnect();
});
