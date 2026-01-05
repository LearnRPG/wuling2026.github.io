
import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import ElevationChart from './components/ElevationChart';
import AIAssistant from './components/AIAssistant';
import { EVENTS } from './constants';
import { EventType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EventType>(EventType.TIS_CHUNG_YUE);

  const activeEvent = EVENTS.find(e => e.id === activeTab)!;

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-blue-500/30">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: "url('https://picsum.photos/id/116/1600/900')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-[#0f172a]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-block px-4 py-1 bg-blue-600 text-xs font-black uppercase tracking-widest rounded-full mb-6 animate-bounce">
            The Pinnacle of Cycling
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter drop-shadow-2xl">
            WULING <span className="text-blue-500">3275</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {activeEvent.spirit}
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        {/* Tab Selection */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveTab(event.id)}
              className={`px-4 md:px-8 py-4 rounded-2xl font-bold transition-all border flex-1 md:flex-none text-sm md:text-base ${
                activeTab === event.id 
                ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-900/20 scale-105' 
                : 'glass-card border-white/5 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {event.id === EventType.TIS_CHUNG_YUE ? '崇越盃 (06.15)' : 'NeverStop (06.27)'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Event Countdown */}
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center overflow-hidden relative">
               {/* Background Decorative Element */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
              <CountdownTimer targetDate={activeEvent.date} title={activeEvent.title} />
              
              <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">主辦單位</div>
                  <div className="font-bold text-sm">{activeEvent.organizer}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">活動日期</div>
                  <div className="font-bold text-sm">2026年{activeTab === EventType.TIS_CHUNG_YUE ? '6月15日' : '6月27日'}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">總爬升</div>
                  <div className="font-bold text-sm text-emerald-400">~2,750 m</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs uppercase mb-1">總里程</div>
                  <div className="font-bold text-sm text-blue-400">55 KM</div>
                </div>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-blue-500 pl-4">賽事資訊</h3>
                <ul className="space-y-4">
                  {activeEvent.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-300 items-start">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-rose-500 pl-4">重要關門點</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <div>
                      <div className="font-bold text-lg">翠峰關門點 (39K)</div>
                      <div className="text-xs text-slate-400 italic">海拔 2,330m</div>
                    </div>
                    <div className="text-rose-500 font-black text-xl">強制執行</div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    山上氣候多變，為確保選手安全，翠峰設有嚴格關門時間。未通過者將回收晶片並禁止繼續挑戰。
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-rose-400 text-xs font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    棄賽強行上山者需簽具切結書。
                  </div>
                </div>
              </div>
            </div>

            {/* Elevation profile */}
            <ElevationChart />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             {/* Rose Gold Medal Focus (For Event 1) */}
             {activeTab === EventType.TIS_CHUNG_YUE && (
              <div className="glass-card rounded-2xl p-6 rose-gold-glow border-2 border-[#b76e79]/30 overflow-hidden relative group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#b76e79]/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-[#b76e79] font-black text-xl mb-2 flex items-center gap-2">
                  <span className="animate-pulse">★</span> 玫瑰金武嶺鎮
                </h3>
                <p className="text-sm text-slate-300 mb-4 font-bold">榮耀累計資格</p>
                <div className="space-y-3">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-[#b76e79] mb-1 font-bold">方案 A (連續參加)</div>
                    <div className="text-sm">累積 <span className="text-white font-bold">3 次</span> 同款成績更換</div>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-[#b76e79] mb-1 font-bold">方案 B (不定期參加)</div>
                    <div className="text-sm">累積 <span className="text-white font-bold">5 次</span> 同款成績更換</div>
                  </div>
                </div>
              </div>
            )}

            <AIAssistant />

            {/* Medal Levels (Event 1 focused) */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">完賽榮耀分類</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-500 font-black text-xl group-hover:scale-110 transition-transform">金</div>
                  <div>
                    <div className="font-bold text-sm">金武嶺鎮</div>
                    <div className="text-xs text-slate-400">4小時內完賽</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-300/20 border border-slate-300/50 flex items-center justify-center text-slate-300 font-black text-xl group-hover:scale-110 transition-transform">銀</div>
                  <div>
                    <div className="font-bold text-sm">銀武嶺鎮</div>
                    <div className="text-xs text-slate-400">5小時內完賽</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-orange-700/20 border border-orange-700/50 flex items-center justify-center text-orange-700 font-black text-xl group-hover:scale-110 transition-transform">銅</div>
                  <div>
                    <div className="font-bold text-sm">銅武嶺鎮</div>
                    <div className="text-xs text-slate-400">5小時01秒 - 7小時完賽</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-700/20 border border-slate-700/50 flex items-center justify-center text-slate-700 font-black text-xl group-hover:scale-110 transition-transform">鐵</div>
                  <div>
                    <div className="font-bold text-sm">翠峰盃獎牌</div>
                    <div className="text-xs text-slate-400">翠峰關門不上山車友專屬</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Map Image placeholder */}
            <div className="glass-card rounded-2xl p-2 overflow-hidden aspect-video relative group">
              <img 
                src="https://picsum.photos/id/1015/800/450" 
                alt="Wuling Route" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 flex items-end p-4">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">Wuling Pass Route View</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="mt-20 border-t border-white/5 pt-10 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-slate-500 text-sm">
            © 2026 武嶺巔峰挑戰賽 - 個人參賽備忘錄網頁
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span>主辦單位：{activeEvent.organizer}</span>
            <span>地點：南投縣合歡山武嶺 (海拔 3275m)</span>
          </div>
        </div>
      </footer>

      {/* Persistent CTA (Bottom bar) */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 p-4 z-50 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase">距離決戰武嶺還有</div>
            <div className="text-sm font-black text-blue-500">
               {activeEvent.date.toLocaleDateString()}
            </div>
          </div>
          <button className="bg-blue-600 px-6 py-2 rounded-xl font-bold text-sm">
            報名連結
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
