import { useEffect, useState } from 'react';
import { useChatbot } from '../../hooks/useChatbot';
import ChatWindow from './ChatWindow';
import './Chatbot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, sendMessage, resetChat } = useChatbot();

  // Escape key se chat band ho jaye
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="chatbot">
      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSend={sendMessage}
          onClose={() => setIsOpen(false)}
          onReset={resetChat}
        />
      )}

      <button
        type="button"
        className={`chatbot__launcher ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}