import React, { useState } from 'react';
import { Stethoscope, Send, Activity, Loader2, Brain, Pill, Clipboard, ChevronFirst as FirstAid } from 'lucide-react';
import { ChatMessage } from './types';
import { useGeminiChat } from './useGeminiChat';

function App() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useGeminiChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput('');
  };

  const features = [
    { icon: Brain, title: 'Akıllı Analiz', description: 'Yapay zeka destekli semptom analizi' },
    { icon: FirstAid, title: '7/24 Destek', description: 'Her an yanınızdayız' },
    { icon: Clipboard, title: 'Detaylı Bilgi', description: 'Kapsamlı sağlık tavsiyeleri' },
    { icon: Pill, title: 'İlaç Bilgisi', description: 'Güvenilir ilaç önerileri' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">SyMpAi</h1>
                <p className="text-emerald-50 text-sm">Yapay Zeka Destekli Sağlık Asistanı</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Activity className="h-6 w-6" />
              <span className="text-emerald-50">7/24 Aktif</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <feature.icon className="h-8 w-8 text-emerald-600 mb-2" />
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-2xl p-6 min-h-[500px] flex flex-col border border-emerald-100">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-12 w-12 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-800 mb-3">
                  Sağlık Asistanınız Hazır
                </h2>
                <p className="text-gray-600 mb-2 max-w-md mx-auto">
                  Şikayetlerinizi detaylı bir şekilde anlatın, size en iyi şekilde yardımcı olalım.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Baş ağrısı</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Mide bulantısı</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Yorgunluk</span>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                        : 'bg-emerald-50 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Şikayetlerinizi detaylı bir şekilde anlatın..."
              className="flex-1 rounded-xl border-2 border-emerald-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl px-6 py-3 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800 text-center">
            <strong>Önemli Not:</strong> Bu bir yapay zeka asistanıdır ve verilen tavsiyeler tıbbi teşhis yerine geçmez. 
            Ciddi sağlık sorunları için lütfen bir doktora başvurun.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;