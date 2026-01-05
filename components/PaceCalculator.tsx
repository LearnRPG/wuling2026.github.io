
import React, { useState, useMemo } from 'react';
import { PACE_SEGMENTS } from '../constants.ts';

const PaceCalculator: React.FC = () => {
  // 使用者輸入參數
  const [ftp, setFtp] = useState(200);
  const [weight, setWeight] = useState(70);
  const [bikeWeight, setBikeWeight] = useState(8);
  const [intensity, setIntensity] = useState(80); // 預設 80% FTP
  const [useAltitudeLoss, setUseAltitudeLoss] = useState(true);

  // 格式化時間
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.round(totalSeconds % 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
  };

  const paceData = useMemo(() => {
    const totalMass = weight + bikeWeight;
    const basePower = ftp * (intensity / 100);
    const gravity = 9.80665;
    
    let accumulatedSeconds = 0;
    let accumulatedDistance = 0;

    const segments = PACE_SEGMENTS.map((seg) => {
      // 1. 計算海拔功率損失係數 (Bassett Model 簡化版)
      // 海拔每 1000m 約損失 6-8% 有氧能力
      const altitudeFactor = useAltitudeLoss 
        ? Math.max(0.6, 1 - (Math.max(0, seg.avgElev - 1000) / 1000) * 0.08)
        : 1;
      
      const effectivePower = basePower * altitudeFactor;
      
      // 2. 功率模型計算時間 (P = F*v)
      // 爬坡消耗功率 P_gravity = m * g * sin(theta) * v
      // 坡度 theta 很小時, sin(theta) ~ tan(theta) = gain / distance
      // v = P / (m * g * (gain/dist) + 滾動阻力等)
      // 我們簡化主要考量重力與滾動阻力 (Crrt = 0.005)
      
      const distInMeters = seg.distance * 1000;
      const grade = seg.gain / distInMeters;
      
      // 估計速度 (m/s) = P / (m * g * (grade + Crr))
      // 額外加上空氣阻力估計 (在爬坡較小，但也考慮進去)
      const Crr = 0.005;
      const speed = effectivePower / (totalMass * gravity * (grade + Crr) + 0.1); 
      
      const seconds = distInMeters / speed;
      accumulatedSeconds += seconds;
      accumulatedDistance += seg.distance;

      return {
        ...seg,
        effectivePower,
        splitSeconds: seconds,
        totalSeconds: accumulatedSeconds,
        cumDistance: accumulatedDistance
      };
    });

    return {
      segments,
      totalTime: accumulatedSeconds,
      wkg: (basePower / weight).toFixed(2)
    };
  }, [ftp, weight, bikeWeight, intensity, useAltitudeLoss]);

  const difficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-emerald-400';
      case 'medium': return 'text-blue-400';
      case 'hard': return 'text-orange-400';
      case 'brutal': return 'text-rose-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 space-y-10 border border-white/5 relative overflow-hidden">
      {/* Header & Result */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-3 italic">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            專業功率配速模擬器
          </h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 italic">Professional Cycling Physics Model</p>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 bg-slate-900/80 p-5 rounded-3xl border border-white/5 flex flex-col items-center">
            <span className="text-[10px] text-slate-500 font-black uppercase mb-1">預估總時間</span>
            <span className="text-3xl font-black text-blue-400 font-mono italic">{formatTime(paceData.totalTime)}</span>
          </div>
          <div className="flex-1 bg-slate-900/80 p-5 rounded-3xl border border-white/5 flex flex-col items-center">
            <span className="text-[10px] text-slate-500 font-black uppercase mb-1">目標 W/Kg</span>
            <span className="text-3xl font-black text-emerald-400 font-mono italic">{paceData.wkg}</span>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-black text-slate-400 uppercase">您的 FTP (W)</label>
            <span className="text-blue-400 font-mono font-bold">{ftp}W</span>
          </div>
          <input type="range" min="100" max="450" step="5" value={ftp} onChange={(e) => setFtp(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-black text-slate-400 uppercase">騎士體重 (kg)</label>
            <span className="text-blue-400 font-mono font-bold">{weight}kg</span>
          </div>
          <input type="range" min="40" max="120" step="1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-black text-slate-400 uppercase">目標強度 (%)</label>
            <span className="text-blue-400 font-mono font-bold">{intensity}%</span>
          </div>
          <input type="range" min="50" max="110" step="1" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>

        <div className="flex flex-col justify-center gap-2">
           <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black text-slate-400 uppercase">考慮海拔功率衰減</span>
              <button 
                onClick={() => setUseAltitudeLoss(!useAltitudeLoss)}
                className={`w-10 h-5 rounded-full transition-colors relative ${useAltitudeLoss ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${useAltitudeLoss ? 'left-6' : 'left-1'}`}></div>
              </button>
           </div>
           <div className="text-[9px] text-slate-500 text-center italic">依據 Bassett 模型計算有氧損失</div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-slate-500 font-black uppercase">
              <th className="pb-4 pl-2">賽道路段</th>
              <th className="pb-4">坡度/爬升</th>
              <th className="pb-4">有效功率</th>
              <th className="pb-4">區間用時</th>
              <th className="pb-4 pr-2 text-right">累計時間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paceData.segments.map((row, idx) => (
              <tr key={idx} className="group hover:bg-white/5 transition-colors">
                <td className="py-5 pl-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${difficultyColor(row.difficulty)} shadow-lg shadow-current`}></span>
                    <div>
                      <div className="text-sm font-bold text-slate-200">{row.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">累積 {row.cumDistance}km</div>
                    </div>
                  </div>
                </td>
                <td className="py-5">
                   <div className="text-[11px] font-bold text-slate-300">{(row.gain / (row.distance * 1000) * 100).toFixed(1)}% <span className="text-slate-500">/ +{row.gain}m</span></div>
                </td>
                <td className="py-5">
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    {Math.round(row.effectivePower)}W
                  </div>
                </td>
                <td className="py-5">
                  <div className="inline-block px-2 py-1 bg-slate-800/50 rounded-lg text-[11px] font-bold text-slate-300">
                    +{formatTime(row.splitSeconds)}
                  </div>
                </td>
                <td className="py-5 pr-2 text-right">
                  <span className="text-sm font-black text-blue-400 italic font-mono">
                    {formatTime(row.totalSeconds)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start gap-3">
          <div className="text-blue-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            <strong>功率模型提示</strong>：本計算採用重力物理模型。W/kg 是武嶺成績的絕對關鍵。當 W/kg 超過 3.0 時，您很有機會在 4 小時內完賽進入金武嶺等級。
          </p>
        </div>
        <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-3">
          <div className="text-rose-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            <strong>海拔警告</strong>：計算機已自動扣除高海拔造成的有氧功率損失。實務上在昆陽之後（3000m+），由於氧氣壓力極低，您的痛苦感會比數據上顯示的更強。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaceCalculator;
