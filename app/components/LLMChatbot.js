'use client';

import React, { useState, useEffect } from 'react';
import { findBestMatch } from '@/utils/matchQuestion';
import { v4 as uuidv4 } from 'uuid';

export default function LLMChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [qaDatabase, setQADatabase] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Q&A pairs
  useEffect(() => {
    const fetchQAPairs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/qa-pairs');
        const data = await response.json();
        setQADatabase(data);
      } catch (error) {
        console.error('Failed to fetch Q&A pairs', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQAPairs();
  }, []);

  // Send message handler
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: uuidv4(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const matchedQA = findBestMatch(input, qaDatabase);

    const botMessage = {
      id: uuidv4(),
      text: matchedQA 
        ? matchedQA.answer 
        : "I don't have an answer for that. Would you like to add this to my knowledge?",
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setInput('');
  };

  // Add new Q&A pair
  const handleAddQAPair = async () => {
    if (!newQuestion || !newAnswer) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/qa-pairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer
        })
      });

      const newQAPair = await response.json();
      
      setQADatabase(prev => [...prev, newQAPair]);
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error('Failed to add Q&A pair', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Chat Messages Display */}
      <div className="h-96 overflow-y-auto border mb-4 p-2">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' 
                ? 'bg-blue-100 text-right' 
                : 'bg-green-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex space-x-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow p-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          Send
        </button>
      </div>

      {/* Add Q&A Section */}
      {/* <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-bold mb-2">Train Chatbot</h3>
        <div className="space-y-2">
          <input 
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter new question"
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          <input 
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Enter corresponding answer"
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          <button 
            onClick={handleAddQAPair}
            className="bg-green-500 text-white p-2 rounded"
            disabled={!newQuestion || !newAnswer || isLoading}
          >
            {isLoading ? 'Processing...' : 'Add Q&A Pair'}
          </button>
        </div>
      </div> */}
    </div>
  );
}