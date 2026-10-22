
const ACTIONS = require("./actions");

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
            if (!roomId || !username) {
                return;
            }

            socket.join(roomId);

            console.log(`${username} joined room ${roomId}`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
