import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatBot() {
    const [messages, setMessages] = useState([
      { text: "Hello 👋 I am your AI Voice Chatbot!", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState("en-US");
    const chatEndRef = useRef(null);
  
    useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isTyping]);
  
    // Text-to-Speech
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    };
  
    // Send message
    const sendMessage = async (customText) => {
      const messageText = customText || input;
      if (!messageText.trim()) return;
  
      setMessages(prev => [...prev, { text: messageText, sender: "user" }]);
      setInput("");
      setIsTyping(true);
  
      try {
        const res = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageText })
        });
  
        if (!res.ok) throw new Error("Server error");
  
        const data = await res.json();
        setMessages(prev => [...prev, { text: data.reply, sender: "bot" }]);
        speak(data.reply);
  
      } catch (err) {
        setMessages(prev => [...prev, { text: "Server connection failed.", sender: "bot" }]);
      }
  
      setIsTyping(false);
    };
  
    // Voice input
    const startListening = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return alert("Speech Recognition not supported");
  
      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.start();
      setIsListening(true);
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        sendMessage(transcript);
      };
  
      recognition.onerror = () => setIsListening(false);
    };

  return (
        <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg" style={{ width: "450px" }}>
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span>AI Voice Chatbot</span>
          <select className="form-select form-select-sm w-auto" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-US">English</option>
            <option value="ta-IN">Tamil</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>

        <div className="card-body overflow-auto" style={{ height: "400px" }}>
          {messages.map((msg, i) => (
            <div key={i} className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
              <div className={`p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-secondary text-white"}`} style={{ maxWidth: "75%" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="d-flex mb-2 justify-content-start">
            <div className="p-2 rounded bg-secondary text-white">AI is typing...</div>
          </div>}
          <div ref={chatEndRef}></div>
        </div>

        <div className="card-footer d-flex align-items-center">
          <input type="text" className="form-control me-2" placeholder="Type or speak..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
          <button className={`btn me-2 ${isListening ? "btn-danger" : "btn-outline-secondary"}`} onClick={startListening}>🎤</button>
          <button className="btn btn-primary" onClick={() => sendMessage()}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;