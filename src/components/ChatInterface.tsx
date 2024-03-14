
import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css'; // Make sure to create a corresponding CSS file based on the provided styles

interface Message {
  sender: string;
  content: string;
}

const ChatInterface: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ChatGPT Bot', content: 'Hello! Do you have anything beachy you would like to know about?' },
  ]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;
  
    const newUserMessage = { sender: 'You', content: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);


  //tuulikiv-beachfinds.azurewebsites.net/chat   OR
  //http://localhost:3000/chat
    try {
      const response = await fetch('tuulikiv-beachfinds.azurewebsites.net/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: userInput }
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const botReply = data.choices[0].message.content;
      setMessages((prevMessages) => [...prevMessages, { sender: 'ChatGPT Bot', content: botReply }]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ChatGPT Bot', content: 'Oops! Something went wrong.' }]);
    }
  
    setUserInput('');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  }
  


  return (
    <div>
      {isMinimized ? (
        <button onClick={toggleMinimize} className="chat-icon">
          Open chat
        </button>
      ) : (
        <div className={`chat-container ${isMinimized ? 'chat-container-minimized' : ''}`}>
          <button onClick={toggleMinimize} className="minimize-button">
            Minimize
          </button>
          <div ref={chatBoxRef} className="chat-box">
            {messages.map((msg, index) => (
              <div key={index}><strong>{msg.sender}:</strong> {msg.content}</div>
            ))}
          </div>
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className = "sendButton">Send</button>
        </div>
      )}
    </div>
  );
}
export default ChatInterface;
