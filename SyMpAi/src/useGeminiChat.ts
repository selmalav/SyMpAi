import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from './types';

const GEMINI_API_KEY = 'AIzaSyDrXsG_yBiRtkFeFEQHzO7zmzgxfZ--RRg';

export function useGeminiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!GEMINI_API_KEY) {
      console.error('Gemini API anahtarı eksik!');
      return;
    }

    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',  // Özel model şu an için kullanılamıyor, gemini-pro kullanıyoruz
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
        }
      });

      const prompt = `Sen bir sağlık asistanısın. Aşağıdaki kuralları takip et:
      1. Her zaman Türkçe yanıt ver
      2. Semptomları dikkatlice analiz et
      3. Genel sağlık tavsiyeleri ver
      4. Ciddi durumlarda mutlaka doktora başvurulmasını öner
      5. Nazik ve empatik ol
      
      Kullanıcının şikayeti: ${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.text(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini API hatası:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Üzgünüm, şu anda sistemde teknik bir sorun yaşanıyor. Lütfen birkaç dakika sonra tekrar deneyin.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}