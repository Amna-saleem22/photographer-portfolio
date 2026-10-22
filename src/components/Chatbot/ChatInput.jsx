import { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        className="chat-input__field"
        type="text"
        value={value}
        placeholder="Ask about packages, dates…"
        onChange={(event) => setValue(event.target.value)}
        aria-label="Type your message"
        autoComplete="off"
      />
      <button
        className="chat-input__send"
        type="submit"
        disabled={!value.trim()}
        aria-label="Send message"
      >
        ➤
      </button>
    </form>
  );
}