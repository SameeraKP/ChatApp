# ChatApp
A simple real-time 1-to-1 chat application built with Node.js, Socket.IO, Express, and plain HTML/CSS/JavaScript. Users can sign up, log in with a passcode, and chat in real-time. Chat messages are saved and persist even after logging out or refreshing.
✨ Features
✅ Signup with username & passcode
✅ Login with authentication
💬 Real-time messaging via WebSockets
💾 Chat history is stored in messages.json
👥 Supports two users chatting with each other
🎨 Clean and minimal front-end UI
🛠 Tech Stack
Node.js
Express.js
Socket.IO
HTML, CSS, JavaScript (Vanilla)
File-based JSON storage
📁 Project Structure
chat-app/
├── public/
│   ├── index.html       # Login page
│   ├── signup.html      # Signup page
│   ├── chat.html        # Main chat UI
│   ├── script.js        # Chat logic
│   └── style.css        # Styling
├── server.js            # Backend server
├── users.json           # User credentials (auto-created)
├── messages.json        # Chat history (auto-created)
├── package.json
└── README.md
🚀 Getting Started
1. Clone the repository:

git clone https://github.com/yourusername/chat-app.git
cd chat-app
2. Install dependencies:

npm install
3. Start the server:

node server.js
4. Open in browser:

Visit http://localhost:3000

📝 Usage
Go to signup.html to create an account.
Login via index.html using your credentials.
Start chatting in chat.html — your messages are saved automatically.
📂 Data Storage
Users are stored in users.json like:
{
  "alice": "1234",
  "bob": "abcd"
}
Messages are stored in messages.json like:
[
  {
    "username": "alice",
    "message": "Hi Bob!"
  },
  {
    "username": "bob",
    "message": "Hey Alice!"
  }
]
