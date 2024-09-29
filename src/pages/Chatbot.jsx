import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Here you would typically call an AI service to get a response
      // For now, we'll just echo the user's message
      setTimeout(() => {
        setMessages(msgs => [...msgs, { text: `You said: ${input}`, sender: 'bot' }]);
      }, 500);
      setInput('');
    }
  };

  return (
    <div className="fixed right-4 bottom-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="bg-purple-600 text-white p-4 rounded-t-lg">
        <h3 className="font-bold">AI Assistant</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-purple-600 text-white px-4 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;