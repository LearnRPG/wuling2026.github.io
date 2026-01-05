
import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer.tsx';
import ElevationChart from './components/ElevationChart.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import { EVENTS } from './constants.ts';
import { EventType } from './types.ts';

const StatItem = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div className="text-center">
    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</div>
    <div className={`text-sm md:text-base font-black ${color} line-clamp-1`}>{value}</div>
  </div>
);

const RuleItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex gap-4 group">
    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors"></div>
    <div className="flex-1">
      <div className="text-sm font-bold text-slate-200 mb-1">{title}</div>
      <div className="text-xs text-slate-400 leading-relaxed">{children}</div>
    </div>
  </div>
);

const BadgeReq = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5">
    <div className="text-xs font-black text-slate-200">{title}</div>
    <div className="text-[10px] text-[#b76e79] font-medium">{desc}</div>
  </div>
);

const MedalRow = ({ type, color, bg, time }: { type: string, color: string, bg: string, time: string }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors">
    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center font-black ${color} border border-white/5`}>
      {type}
    </div>
    <div className="text-sm font-bold text-slate-300">
      <div className="text-xs text-slate-500 font-medium mb-0.5">獎項: {type}武嶺鎮</div>
      {time}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EventType>(EventType.TIS_CHUNG_YUE);
  const activeEvent = EVENTS.find(e => e.id === activeTab)!;

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <div className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 border border-blue-500/50 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Peak Challenge 2026
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 italic tracking-normal">
            WULING <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 pr-4">3275</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            「{activeEvent.spirit}」
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="flex justify-center p-1.5 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/5 mb-10 max-w-xl mx-auto">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveTab(event.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex-1 text-sm ${
                activeTab === event.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {event.id === EventType.TIS_CHUNG_YUE ? '崇越盃 (06/15)' : 'NeverStop (06/27)'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-t border-white/10 relative overflow-hidden group">
              <CountdownTimer targetDate={activeEvent.date} title={activeEvent.title} />
              <div className="mt-12 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem label="主辦" value={activeEvent.organizer} />
                <StatItem label="日期" value={activeTab === EventType.TIS_CHUNG_YUE ? '06.15 Mon' : '06.27 Sat'} />
                <StatItem label="總爬升" value="2,750m" color="text-emerald-400" />
                <StatItem label="終點海拔" value="3,275m" color="text-blue-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  領獎流程與規則
                </h3>
                <div className="space-y-4">
                  <RuleItem title="成績查詢">抵達終點後掃描坐管貼 QR Code，依顯示成績排隊領取。</RuleItem>
                  <RuleItem title="菁英組限制">限時 4 小時完賽，超時不發放獎牌與證書。</RuleItem>
                  <RuleItem title="未領補發">現場獎項未領取者恕不補發。</RuleItem>
                  <RuleItem title="晶片注意">禁止於上車頂架前黏貼坐管貼，以免風切損壞晶片。</RuleItem>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="w-1 h-6 bg-rose-500 rounded-full"></div>
                  安全與關門警告
                </h3>
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 mb-4">
                  <p className="text-rose-400 text-sm leading-relaxed font-medium">
                    山上氣候多變，翠峰 (39K) 執行強制關門。棄賽者需簽切結書並回收晶片。
                  </p>
                </div>
                <div className="space-y-4 text-sm text-slate-400">
                  <p>• 唱名三次未出現者直接替補。</p>
                  <p>• 翠峰盃獎牌限關門車友領取，挑戰失敗下滑者不得領取。</p>
                </div>
              </div>
            </div>

            <ElevationChart />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#b76e79] to-[#e8c39e] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative glass-card rounded-3xl p-6 bg-slate-900/90">
                <h3 className="text-[#b76e79] font-black text-xl mb-2 flex items-center justify-between">
                  玫瑰金武嶺鎮
                  <span className="text-[10px] bg-[#b76e79]/20 px-2 py-1 rounded">PREMIUM</span>
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">2025年起累計系統自動審核。象徵公路之巔的最高榮耀。</p>
                <div className="space-y-3">
                  <BadgeReq title="累積 3 次" desc="同款武嶺鎮直接更換" />
                  <BadgeReq title="累積 5 次" desc="中途未參加者累積更換" />
                </div>
              </div>
            </div>

            <AIAssistant />

            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-bold text-white mb-6 px-2">完賽等級表</h3>
              <div className="space-y-3">
                <MedalRow type="金" color="text-yellow-500" bg="bg-yellow-500/10" time="4小時內完賽" />
                <MedalRow type="銀" color="text-slate-300" bg="bg-slate-300/10" time="5小時內完賽" />
                <MedalRow type="銅" color="text-orange-700" bg="bg-orange-700/10" time="5-7小時完賽" />
                <MedalRow type="鐵" color="text-slate-500" bg="bg-slate-500/10" time="翠峰關門紀念" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
