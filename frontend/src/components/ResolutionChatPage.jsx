import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveResolutionPlan } from '../api';

const ResolutionChatPage = () => {
  const { resolutionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const userId = 1; // Temporary hardcoded userId

  useEffect(() => {
    setMessages([
      { id: 1, sender: 'ai', text: `Hello! Let's plan your resolution #${resolutionId}. What is your main goal?` },
    ]);
  }, [resolutionId]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { id: messages.length + 1, sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: 'ai', text: `That's a great start! To help me create a comprehensive plan, could you tell me more about what you hope to achieve with "${input}"?` }
      ]);
    }, 1000);
  };

  const handleFinalizePlan = async () => {
    try {
      const finalPlan = messages.filter(msg => msg.sender === 'ai').map(msg => msg.text).join('\n');
      await saveResolutionPlan(userId, resolutionId, finalPlan);
      alert('Resolution plan saved successfully!');
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Error saving resolution plan:', err);
      alert('Failed to save resolution plan.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Resolution Chat (ID: {resolutionId})</h1>
          <button
            onClick={handleFinalizePlan}
            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Finalize Plan
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col h-full bg-white shadow rounded-lg p-4">
          <div className="flex-grow overflow-y-auto mb-4 border-b border-gray-200 pb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`rounded-lg p-2 max-w-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResolutionChatPage;