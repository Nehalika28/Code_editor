const ACTIONS = require("./actions");

const usersocketmap = {};

async function getAllconnectedClients(io, roomId) {
    const sockets = await io.in(roomId).fetchSockets();

    return sockets.map((socket) => ({
        socketId: socket.id,
        username: usersocketmap[socket.id],
    }));
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on(ACTIONS.JOIN, async ({ roomId, username }) => {
            if (!roomId || !username) {
                return;
            }

            socket.join(roomId);

            usersocketmap[socket.id] = username;

            const clients = await getAllconnectedClients(io, roomId);

            console.log(clients);
            clients.forEach(({socketId})=>{
                io.to(socketId).emit(ACTIONS.JOINED,{
                    clients,
                    username,
                    socketId:socket.id
                })
            })

            console.log(`${username} joined room ${roomId}`);
            console.log(clients);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            delete usersocketmap[socket.id];
        });
    });
};