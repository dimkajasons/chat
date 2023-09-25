import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(
    cors({
        origin: "http://127.0.0.1:5173",
    })
);

app.get("/", (req, res) => {
    res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("chat-message", (message) => {
        console.log(message);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
