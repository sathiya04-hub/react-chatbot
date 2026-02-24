# AI Voice Chatbot

A **React + Node.js AI Voice Chatbot** with:

- 🎤 Voice input (speech-to-text)
- 🧠 AI intelligent replies (GPT-3.5-turbo)
- 🔊 Voice output (text-to-speech)
- 🌍 Multi-language support (English, Tamil, Hindi)
- 💻 Bootstrap-based responsive UI
- 🔒 Secure backend for API key management

---

## 🏗 Project Structure
my-chatbot/
├─ frontend/ # React app
├─ backend/ # Node.js backend
├─ .gitignore # ignores node_modules, .env, build files
├─ README.md
└─ .env.example # placeholder for API keys

## ⚡ Setup Instructions

### 1. Backend

mkdir backend
cd backend
npm init -y
npm install express cors dotenv openai

### Create .env file and add your OpenAI API key:
.env
# edit .env and set your key:
# OPENAI_API_KEY=sk-xxxxxxxxxxxx

### Start the backend server:
npm start


### 2. Frontend

### Install Vite + Front End backend folder:
npm create vite@latest frontend
cd frontend
npm install
npm run dev

### Install Bootstrap:
npm install bootstrap

### Then open main.jsx (Vite) or index.js (CRA) and add:
import 'bootstrap/dist/css/bootstrap.min.css';
