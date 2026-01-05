
import React, { useState, useMemo } from 'react';
import { ELEVATION_DATA } from '../constants';

// 物理常數
const G = 9.80665;
const CRR = 0.005; // 滾動阻力系數 (平均公路外胎)
const CDA = 0.36;  // 風阻面積 (一般爬坡姿勢)
const RHO_SEA_LEVEL = 1.225; // 海平面空氣密度
const DRIVETRAIN_EFFICIENCY = 0.98; // 傳動效率 98%

const ClimbingCalculator: React.FC = () => {
  const [ftp, setFtp] = useState<number>(250);
  const [weight, setWeight] = useState<number>(70);
  const [gearWeight, setGearWeight] = useState<number>(10); // 預設改為 10kg
  const [intensity, setIntensity] = useState<number>(0.80);
  const [useAltitudeCorrection, setUseAltitudeCorrection] = useState<boolean>(true);

  const calculatedData = useMemo(() => {
    const totalMass = weight + gearWeight;
    
    // 求解速度的函數 (二分搜尋法)
    const solveVelocity = (targetPower: number, grade: number, airDensity: number) => {
      let low = 0;
      let high = 25; 
      const theta = Math.atan(grade);
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let i = 0; i < 20; i++) { 
        const v = (low + high) / 2;
        const pGrav = totalMass * G * sinTheta * v;
        const pRoll = totalMass * G * cosTheta * CRR * v;
        const pDrag = 0.5 * airDensity * CDA * Math.pow(v, 3);
        const pTotal = (pGrav + pRoll + pDrag) / DRIVETRAIN_EFFICIENCY;

        if (pTotal < targetPower) low = v;
        else high = v;
      }
      return (low + high) / 2;
    };

    let totalSeconds = 0;
    const segmentsDetail = [];

    for (let i = 1; i < ELEVATION_DATA.length; i++) {
      const start = ELEVATION_DATA[i - 1];
      const end = ELEVATION_DATA[i];
      
      const distKm = end.distance - start.distance;
      const elevGain = end.elevation - start.elevation;
      const grade = elevGain / (distKm * 1000);
      const avgElev = (start.elevation + end.elevation) / 2;

      const airDensity = RHO_SEA_LEVEL * Math.exp(-avgElev / 8500);
      const altitudeFactor = useAltitudeCorrection 
        ? Math.max(0.7, 1 - (avgElev / 100 * 0.004)) 
        : 1.0;
      
      const segmentTargetPower = ftp * intensity * altitudeFactor;
      const v = solveVelocity(segmentTargetPower, grade, airDensity);
      const segmentSeconds = (distKm * 1000) / v;
      
      totalSeconds += segmentSeconds;

      const formatTime = (s: number) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      };

      segmentsDetail.push({
        name: end.name,
        distance: end.distance,
        elevation: end.elevation,
        grade: (grade * 100).toFixed(1),
        avgSpeed: (v * 3.6).toFixed(1),
        segmentTime: formatTime(segmentSeconds),
        cumulativeTime: formatTime(totalSeconds)
      });
    }

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMins = Math.floor((totalSeconds % 3600) / 60);
    const wkg = (ftp * intensity) / totalMass;

    let medal = '鐵';
    const hoursNum = totalSeconds / 3600;
    if (hoursNum <= 4) medal = '金';
    else if (hoursNum <= 5) medal = '銀';
    else if (hoursNum <= 7) medal = '銅';

    return {
      totalHours,
      totalMins,
      wkg: wkg.toFixed(2),
      medal,
      segments: segmentsDetail,
      totalSeconds
    };
  }, [ftp, weight, gearWeight, intensity, useAltitudeCorrection]);

  const getMedalColor = (medal: string) => {
    switch (medal) {
      case '金': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      case '銀': return 'text-slate-300 border-slate-300/30 bg-slate-300/10';
      case '銅': return 'text-orange-700 border-orange-700/30 bg-orange-700/10';
      default: return 'text-slate-500 border-slate-700/30 bg-slate-700/10';
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 p-6 md:p-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2v20"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/></svg>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white tracking-tight">武嶺物理性能預估計算機</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Physics-Based Performance Predictor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-slate-950/40 px-6 py-4 rounded-2xl border border-white/5">
            <div className="text-center">
              <div className="text-[10px] text-slate-500 font-black uppercase mb-1">平地推力比</div>
              <div className="text-xl font-black text-white">{calculatedData.wkg} <span className="text-xs text-slate-500">W/kg</span></div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-[10px] text-slate-500 font-black uppercase mb-1">預估完賽</div>
              <div className="text-xl font-black text-emerald-400">{calculatedData.totalHours}H {calculatedData.totalMins}M</div>
            </div>
            <div className={`px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter ${getMedalColor(calculatedData.medal)}`}>
              {calculatedData.medal}牌等級
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2 text-left">騎士參數</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-200">FTP (功能閾值功率)</label>
                <span className="text-xl font-black text-blue-500">{ftp} <span className="text-xs text-slate-500">W</span></span>
              </div>
              <input 
                type="range" min="100" max="450" step="1" 
                value={ftp} onChange={(e) => setFtp(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase text-left block">騎士體重 (kg)</label>
                <input 
                  type="number" step="0.1" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase text-left block">器材總重 (kg)</label>
                <input 
                  type="number" step="0.1" value={gearWeight} onChange={(e) => setGearWeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-200">目標強度 (IF)</label>
                <span className="text-xl font-black text-emerald-500">{Math.round(intensity * 100)}<span className="text-xs text-slate-500">%</span></span>
              </div>
              <input 
                type="range" min="0.5" max="1.0" step="0.01" 
                value={intensity} onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                <div className="text-left">
                  <label className="text-sm font-bold text-slate-200 block">高海拔氧氣損耗修正</label>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Altitude Power Loss Model</p>
                </div>
                <button 
                  onClick={() => setUseAltitudeCorrection(!useAltitudeCorrection)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${useAltitudeCorrection ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <span className={`${useAltitudeCorrection ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                </button>
              </div>
            </div>
          </div>

          {/* Physical Model Parameters Section */}
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 text-left">
            <h4 className="text-xs font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              物理模型參數
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-[10px] font-bold">
              <span className="text-slate-500">滾動阻力 (Crr)</span>
              <span className="text-slate-300 text-right">0.005</span>
              <span className="text-slate-500">風阻面積 (CdA)</span>
              <span className="text-slate-300 text-right">0.36 m²</span>
              <span className="text-slate-500">傳動效率</span>
              <span className="text-slate-300 text-right">98%</span>
              <span className="text-slate-500">大氣壓力模型</span>
              <span className="text-slate-300 text-right">Barometric</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-4 text-left">分段物理預估與節點詳情 (Physics Splits & Segment Data)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-slate-500 font-black uppercase border-b border-white/5">
                  <th className="pb-3 px-2">路段節點</th>
                  <th className="pb-3 px-2 text-center">里程</th>
                  <th className="pb-3 px-2 text-center">海拔</th>
                  <th className="pb-3 px-2 text-center">平均坡度</th>
                  <th className="pb-3 px-2 text-center">預估均速</th>
                  <th className="pb-3 px-2 text-right">區段時間</th>
                  <th className="pb-3 px-2 text-right text-emerald-400">累積完賽時間</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="bg-white/5">
                   <td className="py-3 px-2 text-xs font-bold text-slate-400">地理中心碑 (起點)</td>
                   <td className="py-3 px-2 text-center text-[10px] font-mono text-slate-500">0.0 km</td>
                   <td className="py-3 px-2 text-center text-[10px] font-mono text-slate-500">450 m</td>
                   <td className="text-center">-</td>
                   <td className="text-center">-</td>
                   <td className="text-right">-</td>
                   <td className="text-right font-mono text-emerald-400 text-xs">00:00:00</td>
                </tr>
                {calculatedData.segments.map((seg, idx) => (
                  <tr key={idx} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${idx === calculatedData.segments.length - 1 ? 'bg-rose-500' : 'bg-blue-500'}`}></div>
                        <span className="text-sm font-bold text-slate-200">{seg.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center text-xs font-mono text-slate-400">
                      {seg.distance} <span className="text-[9px]">km</span>
                    </td>
                    <td className="py-4 px-2 text-center text-xs font-mono text-slate-400">
                      {seg.elevation} <span className="text-[9px]">m</span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${parseFloat(seg.grade) > 8 ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-800 text-slate-400'}`}>
                        {seg.grade}%
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center text-xs font-mono text-slate-400">{seg.avgSpeed} <span className="text-[9px]">km/h</span></td>
                    <td className="py-4 px-2 text-right text-xs font-mono text-slate-300">{seg.segmentTime}</td>
                    <td className="py-4 px-2 text-right text-sm font-black text-emerald-400 font-mono tracking-tighter">{seg.cumulativeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex gap-4 items-center bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-left">
             <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
             </div>
             <div>
               <p className="text-xs font-black text-blue-400 uppercase">物理動力預估模型說明</p>
               <p className="text-xs text-slate-400 leading-relaxed mt-1">
                 本模型結合了動態空氣密度（海拔越高阻力越小）與高度功率補償（海拔越高有效輸出越低）。實際情況下，集團騎乘的風阻效益 (Drafting) 可進一步提升約 10-20% 的速度，請視個人情況調整 IF。
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimbingCalculator;
