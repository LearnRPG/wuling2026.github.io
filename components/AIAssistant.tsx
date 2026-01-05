
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Using gemini-3-pro-preview for coaching and training suggestions as it's a complex text task.
      const result = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: input,
        config: {
          systemInstruction: "你是一位專業的自行車教練，專門指導台灣「武嶺」3275公尺爬坡挑戰。請根據武嶺的路況（人止關、翠峰、昆陽）、高海拔氣候、補給策略、訓練建議提供專業且激勵人心的回答。回答請簡潔有力，約200字以內。",
        },
      });
      
      // The GenerateContentResponse object features a text property (not a method).
      setResponse(result.text || '教練目前忙線中，請稍後再試。');
    } catch (error) {
      console.error(error);
      setResponse('抱歉，連結教練系統時發生錯誤。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border-l-4 border-blue-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
        <div>
          <h3 className="font-bold text-white">武嶺 AI 訓練顧問</h3>
          <p className="text-xs text-slate-400">詢問關於備戰、補給 or 路線建議</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askGemini()}
            placeholder="例如：如何準備高海拔呼吸？或推薦補給品？"
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={askGemini}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all"
          >
            {loading ? '思考中...' : '送出'}
          </button>
        </div>
        
        {response && (
          <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-800 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap italic">
              「{response}」
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
