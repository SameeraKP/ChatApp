const socket = io();
const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "index.html"; // redirect if not logged in
}

const chatDiv = document.getElementById("chat");

// Load existing messages
fetch("/chats")
  .then(res => res.json())
  .then(messages => {
    messages.forEach(msg => appendMessage(msg));
  });

// Receive messages
socket.on("receiveMessage", data => {
  appendMessage(data);
});

// Send message
function sendMessage() {
  const input = document.getElementById("message");
  const message = input.value.trim();
  if (message === "") return;

  const data = {
    sender: username,
    message: message,
    timestamp: new Date().toLocaleTimeString()
  };

  socket.emit("sendMessage", data);
  input.value = "";
}

// Append message to chat
function appendMessage({ sender, message, timestamp }) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === username ? "me" : "other";
  msgDiv.innerHTML = `<strong>${sender}</strong>: ${message} <span>${timestamp}</span>`;
  chatDiv.appendChild(msgDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
