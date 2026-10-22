import { useCallback, useEffect, useRef, useState } from 'react';
import { createBooking, respond } from '../data/chatbotEngine';
import { DEFAULT_QUICK_REPLIES } from '../data/chatbotIntents';
import { studio } from '../data/studio';

function createWelcomeMessageList() {
  return [
    {
      id: 'welcome',
      role: 'bot',
      type: 'text',
      text: `Hi 👋 I'm the ${studio.name} assistant.\nAsk me about packages, pricing or availability — or I can take your booking inquiry right here.`,
      quickReplies: DEFAULT_QUICK_REPLIES,
    },
  ];
}

export function useChatbot() {
  const [messages, setMessages] = useState(createWelcomeMessageList);
  const [isTyping, setIsTyping] = useState(false);

  const bookingRef = useRef(createBooking());
  const idRef = useRef(1);
  const timersRef = useRef([]);

  const nextId = useCallback(() => `msg-${idRef.current++}`, []);

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    },
    [],
  );

  const sendMessage = useCallback(
    (rawInput) => {
      const input = String(rawInput ?? '').trim();
      if (!input) return;

      setMessages((prev) => [...prev, { id: nextId(), role: 'user', type: 'text', text: input }]);

      const { booking, messages } = respond(input, bookingRef.current);
      bookingRef.current = booking;

      setIsTyping(true);

      const delay = 380 + Math.min(messages.length, 3) * 220;
      const timer = window.setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          ...messages.map((message) => ({ id: nextId(), role: 'bot', ...message })),
        ]);
        timersRef.current = timersRef.current.filter((item) => item !== timer);
      }, delay);

      timersRef.current.push(timer);
    },
    [nextId],
  );

  const resetChat = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    bookingRef.current = createBooking();
    setIsTyping(false);
    setMessages(createWelcomeMessageList());
  }, []);

  return { messages, isTyping, sendMessage, resetChat };
}