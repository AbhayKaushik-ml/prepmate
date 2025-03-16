// components/Chatbot.js
"use client";
import { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = input; // Store only the message content
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content; // Get the bot's response
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to fetch response from the chatbot.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} disabled={loading}>Send</button>
    </div>
  );
};

export default Chatbot;
