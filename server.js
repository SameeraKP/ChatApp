const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const USERS_FILE = "users.json";
const MESSAGES_FILE = "messages.json";

let users = {};
let messages = [];

// Load users
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE));
}

// Load messages
if (fs.existsSync(MESSAGES_FILE)) {
  messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
}

// Signup endpoint
app.post("/signup", (req, res) => {
  const { username, passcode } = req.body;
  if (users[username]) return res.status(409).send("Username already exists");

  users[username] = passcode;
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.sendStatus(200);
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, passcode } = req.body;
  if (users[username] && users[username] === passcode) return res.sendStatus(200);
  res.sendStatus(401);
});

// Get chat history
app.get("/chats", (req, res) => {
  res.json(messages);
});

// Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", (data) => {
    messages.push(data);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
