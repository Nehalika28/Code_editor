// Importing Express framework
const express = require("express");

// Creating an Express application
const app = express();

// Importing Node.js built-in HTTP module
const http = require("http");

// Creating an HTTP server and passing the Express app to it
const server = http.createServer(app);

// Importing the Server class from Socket.IO
const { Server } = require("socket.io");

// Creating a Socket.IO server instance and attaching it to the HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
require("./socket")(io);
// Defining a GET route for the root URL "/"
app.get("/", (req, res) => {
  // Sending a response to the client
  res.send("Server is running!");
});



// Starting the HTTP server on port 5001
server.listen(5001, () => {

  // Printing a message when the server starts successfully
  console.log("Server running on port 5001");
});