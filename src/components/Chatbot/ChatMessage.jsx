import PackageList from './PackageList';

export default function ChatMessage({ message, onQuickReply }) {
  const isBot = message.role === 'bot';

  return (
    <div className={`chat-row ${isBot ? 'chat-row--bot' : 'chat-row--user'}`}>
      <div className={`chat-bubble ${isBot ? 'chat-bubble--bot' : 'chat-bubble--user'}`}>
        {message.text && <p className="chat-bubble__text">{message.text}</p>}
        {message.cards === 'packages' && <PackageList />}
      </div>

      {isBot && message.quickReplies?.length > 0 && (
        <div className="chat-quick-replies">
          {message.quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              className="chat-quick-reply"
              onClick={() => onQuickReply(reply)}
            >
              {reply}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}