'use client';

import { useEffect, useRef, useState } from 'react';
import model from '@/lib/gemini';
import Markdown from 'react-markdown';
import styles from "./MainPrompt.module.css";

const MainPrompt = () => {
  const [messages, setMessages] = useState([]); // Store all questions and answers

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const add = async (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);

    try {
      const result = await model.generateContent(text);
      const response = await result.response;
      const answer = await response.text();
      setMessages((prev) => [...prev, { role: 'bot', content: answer }]);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setMessages((prev) => [...prev, { role: 'bot', content: 'Something went wrong. Please try again.' }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text);
    e.target.reset();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className="p-4 bg-gray-800 text-center text-lg font-semibold">
        Chat
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs md:max-w-md ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-700 text-white self-start'
            }`}
          >
            {msg.role === 'bot' ? <Markdown>{msg.content}</Markdown> : msg.content}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 bg-gray-800 border-t border-gray-700"
      >
        <input
          type="text"
          name="text"
          placeholder="Ask anything..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MainPrompt;
