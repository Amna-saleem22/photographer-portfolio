import { useState } from 'react';

export function useAICaption() {
  const [loading, setLoading] = useState(false);

  const getAICaption = async (base64Image) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: "Write a short, elegant 1-sentence caption for this photography portfolio image. Also provide a descriptive alt text for SEO." },
                { inline_data: { mime_type: "image/jpeg", data: base64Image } }
              ]
            }]
          })
        }
      );
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI caption failed', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getAICaption, loading };
}