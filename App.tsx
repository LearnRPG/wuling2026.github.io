
import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer.tsx';
import ElevationChart from './components/ElevationChart.tsx';
import PaceCalculator from './components/PaceCalculator.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import { EVENTS } from './constants.ts';
import { EventType } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EventType>(EventType.TIS_CHUNG_YUE);

  const activeEvent = EVENTS.find(e => e.id === activeTab)!;

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-blue-500/30 bg-slate-950">
      {/* Hero Section */}
      <div className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8">
            The Legend of Wuling 3275
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter italic">
            WULING <span className="title-gradient">3275</span>
          </h1>
          <p className="text-sm md:text-xl font-medium text-slate-400 max-w-2xl mx-auto leading-relaxed italic opacity-80">
            「{activeEvent.spirit}」
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        {/* Tab Selection */}
        <div className="flex justify-center p-1.5 bg-slate-900/90 backdrop-blur-2xl rounded-2xl border border-white/10 mb-10 max-w-md mx-auto shadow-2xl">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveTab(event.id)}
              className={`px-6 py-3 rounded-xl font-black transition-all flex-1 text-xs uppercase tracking-widest ${
                activeTab === event.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {event.id === EventType.TIS_CHUNG_YUE ? '崇越盃' : 'NeverStop'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Event Countdown */}
            <div className="glass-card rounded-[3rem] p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
              <CountdownTimer targetDate={activeEvent.date} title={activeEvent.title} />
              
              <div className="mt-14 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">主辦單位</div>
                  <div className="font-bold text-sm text-slate-200">{activeEvent.organizer}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">活動日期</div>
                  <div className="font-bold text-sm text-slate-200">2026.06.{activeTab === EventType.TIS_CHUNG_YUE ? '15' : '27'}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">總爬升</div>
                  <div className="font-bold text-sm text-emerald-400">2,750 m</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-2 tracking-widest">總里程</div>
                  <div className="font-bold text-sm text-blue-400">55 KM</div>
                </div>
              </div>
            </div>

            {/* Pace Calculator Integration */}
            <PaceCalculator />

            {/* Event Details Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-3xl p-8 border-l-4 border-blue-500">
                <h3 className="text-lg font-black mb-6 text-white uppercase tracking-widest">賽事重要規章</h3>
                <ul className="space-y-4">
                  {activeEvent.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-4 text-sm text-slate-400 leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-3xl p-8 border-l-4 border-rose-500">
                <h3 className="text-lg font-black mb-6 text-white uppercase tracking-widest">安全關門限制</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-rose-500/10 border border-rose-500/10 rounded-2xl">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-black text-rose-500">翠峰關門點 (39K)</div>
                      <div className="text-[10px] text-rose-500/70 font-bold uppercase">2,330m</div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      山上氣候多變，翠峰執行強制關門。未通過者將回收晶片並禁止繼續挑戰。
                    </p>
                  </div>
                  <div className="text-xs text-slate-500 space-y-2">
                    <p>• 棄賽強行上山者需簽具切結書。</p>
                    <p>• 菁英組超過 4 小時判未完賽無獎牌。</p>
                    <p>• 晶片坐管貼禁止於車頂架前黏貼。</p>
                  </div>
                </div>
              </div>
            </div>

            <ElevationChart />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             {/* Rose Gold Medal (Special for Event 1) */}
             {activeTab === EventType.TIS_CHUNG_YUE && (
              <div className="glass-card rounded-[2.5rem] p-8 rose-gold-glow relative group overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#b76e79]/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-[#b76e79] font-black text-2xl mb-2 flex items-center gap-3 italic">
                   玫瑰金武嶺鎮
                </h3>
                <p className="text-[10px] text-slate-500 mb-6 font-black uppercase tracking-[0.2em]">Honorary Legend Medal</p>
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-[#b76e79] mb-1 font-black uppercase">累積 3 次</div>
                    <div className="text-sm font-bold text-slate-200">同款武嶺鎮直接更換</div>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-[#b76e79] mb-1 font-black uppercase">累積 5 次</div>
                    <div className="text-sm font-bold text-slate-200">中途未參加者累計更換</div>
                  </div>
                </div>
              </div>
            )}

            <AIAssistant />

            {/* Medal Levels */}
            <div className="glass-card rounded-[2.5rem] p-8">
              <h3 className="font-black text-white text-sm mb-8 uppercase tracking-widest border-b border-white/5 pb-4">完賽榮耀分類</h3>
              <div className="space-y-6">
                {[
                  { label: '金武嶺', time: '4 小時內', color: 'bg-yellow-500' },
                  { label: '銀武嶺', time: '5 小時內', color: 'bg-slate-300' },
                  { label: '銅武嶺', time: '5 ~ 7 小時', color: 'bg-orange-700' },
                  { label: '翠峰盃', time: '關門殘念', color: 'bg-slate-600' }
                ].map(m => (
                  <div key={m.label} className="flex items-center gap-5 group">
                    <div className={`w-12 h-12 rounded-2xl ${m.color}/20 border border-${m.color}/50 flex items-center justify-center text-xs font-black group-hover:scale-110 transition-transform shadow-xl`}>
                      {m.label[0]}
                    </div>
                    <div>
                      <div className="font-black text-slate-200 text-sm">{m.label}鎮</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{m.time}完賽</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Sponsors */}
            <div className="glass-card rounded-[2rem] p-8 text-center">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">贊助夥伴</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {['GA黃金甲', 'GAIN', '船井生醫', 'Bianchi', 'AKIWEI', 'GA', '舒跑'].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-slate-500">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t border-white/5 pt-10 pb-20 px-4 text-center">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 WULING CHALLENGE DASHBOARD
        </p>
      </footer>
    </div>
  );
};

export default App;
