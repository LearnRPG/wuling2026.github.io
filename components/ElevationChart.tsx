
import React from 'react';
import { ELEVATION_DATA } from '../constants.ts';

const ElevationChart: React.FC = () => {
  // SVG 繪圖參數
  const width = 800;
  const height = 300;
  const padding = { top: 40, right: 60, bottom: 40, left: 60 };
  
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxDist = 55;
  const maxElev = 3500;

  // 坐標轉換
  const getX = (dist: number) => padding.left + (dist / maxDist) * chartWidth;
  const getY = (elev: number) => height - padding.bottom - (elev / maxElev) * chartHeight;

  // 建立路徑
  const points = ELEVATION_DATA.map(d => `${getX(d.distance)},${getY(d.elevation)}`).join(' ');
  const areaPath = `M${getX(0)},${height - padding.bottom} ${points} L${getX(55)},${height - padding.bottom} Z`;
  const linePath = `M${points}`;

  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl font-black mb-4 text-white border-l-4 border-emerald-500 pl-4">專業海拔剖面圖</h3>
      <div className="glass-card rounded-3xl p-6 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 橫向格線 */}
          {[0, 900, 1800, 2700, 3500].map(val => (
            <g key={val}>
              <line 
                x1={padding.left} y1={getY(val)} x2={width - padding.right} y2={getY(val)} 
                stroke="#ffffff10" strokeDasharray="5,5" 
              />
              <text x={padding.left - 10} y={getY(val) + 4} textAnchor="end" fill="#64748b" fontSize="10">{val}</text>
            </g>
          ))}

          {/* 海拔填色 */}
          <path d={areaPath} fill="url(#chartGrad)" />
          
          {/* 主線條 */}
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" />

          {/* 武嶺 3275m 標註 */}
          <line x1={padding.left} y1={getY(3275)} x2={getX(55)} y2={getY(3275)} stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" />
          <text x={getX(55) + 5} y={getY(3275) + 4} fill="#f43f5e" fontSize="11" fontWeight="bold">武嶺 3275m</text>

          {/* 里程標記 */}
          {ELEVATION_DATA.map(p => (
            <g key={p.name}>
              <circle cx={getX(p.distance)} cy={getY(p.elevation)} r="3" fill="#10b981" />
              <text 
                x={getX(p.distance)} 
                y={height - 10} 
                textAnchor="middle" 
                fill="#475569" 
                fontSize="9" 
                transform={p.distance === 0 || p.distance === 55 ? '' : 'rotate(-30,'+getX(p.distance)+','+(height-10)+')'}
              >
                {p.distance}km
              </text>
            </g>
          ))}
          
          <text x={width/2} y={height - 2} textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">里程 (KM)</text>
          <text x={10} y={height/2} textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold" transform={`rotate(-90, 10, ${height/2})`}>海拔 (M)</text>
        </svg>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {ELEVATION_DATA.map((p) => (
            <div key={p.name} className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[10px] flex flex-col items-center">
              <span className="text-slate-500 font-bold">{p.name}</span>
              <span className="text-slate-200 font-black">{p.elevation}m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElevationChart;
