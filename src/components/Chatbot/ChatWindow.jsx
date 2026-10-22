import { useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from '../Chatbot/ChatMessage';
import { studio } from '../../data/studio';

export default function ChatWindow({ messages, isTyping, onSend, onClose, onReset }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  return (
    <section className="chat-window" role="dialog" aria-label={`${studio.name} chat assistant`}>
      <header className="chat-window__header">
        <div className="chat-window__identity">
          <span className="chat-window__avatar" aria-hidden="true">
            📸
          </span>
          <div>
            <p className="chat-window__title">{studio.name}</p>
            <p className="chat-window__status">
              <span className="chat-window__dot" /> Online · replies instantly
            </p>
          </div>
        </div>

        <div className="chat-window__actions">
          <button type="button" onClick={onReset} title="Start over" aria-label="Start over">
            ⟳
          </button>
          <button type="button" onClick={onClose} title="Close chat" aria-label="Close chat">
            ✕
          </button>
        </div>
      </header>

      <div className="chat-window__body">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} onQuickReply={onSend} />
        ))}

        {isTyping && (
          <div className="chat-row chat-row--bot">
            <div className="chat-bubble chat-bubble--bot chat-bubble--typing" aria-live="polite" aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSend} />
    </section>
  );
}