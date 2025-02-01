import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    const userSockets = new Map(); //{userId: socketId} when the user logs in they will get a socket id
    const userActivites = new Map(); //{userId: lastActiveTime} to check if the user is active
    io.on("connection", (socket) => {
        //things to do when a user connects
        socket.on("usr_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivites.set(userId, "Idle");

            //sending event from server to client
            //broadcast to all the sockets that the user is connected
            io.emit("user_connected", userId);

            socket.emit("User_online", Array.from(userSockets.keys()));

            io.emit("user_activities", Array.from(userActivites.entries()));
        });

        //getting the user id and name of music we listening to
        socket.on("update_activity", ({ userId, activity }) => {
            console.log("activity updated", userId, activity);
            userActivites.set(userId, activity);
            // broadcast to everyone
            io.emit("user_activities", { userId, activity });
        });

        // sending message to the other but first ity will be stored in a database
        socket.on("send_message", async (data) => {
            try {
                const { senderId, receiverId, content } = data;

                const message = Message.create({
                    senderId,
                    receiverId,
                    content,
                });

                //send to receiver in real time if they are online
                const receiverSocketId = userSockets.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("new_message", message);
                }

                //send to sender in real time updating ui
                socket.emit("message_sent", message);
            } catch (error) {
                console.error("Message sending failed", error);
                socket.emit("message_failed", error.message);
            }
        });

        //when the user dissconnects
        socket.on("disconnect", () => {
            let disConnectedUserId;
            for(const [userId, socketId] of userSockets.entries()){
                //find the user id of the disconnected user
                if(socketId === socket.id){
                    disConnectedUserId = userId;
                   userSockets.delete(userId);
                   userActivites.delete(userId);
                   break;
                }
            }
            if(disConnectedUserId){
                io.emit("user_disconnected", disConnectedUserId);
                io.emit("user_activities", Array.from(userActivites.entries()));
            }
        })
    });
};
