
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ELEVATION_DATA } from '../constants';

const ElevationChart: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] glass-card rounded-2xl p-4 md:p-6 overflow-hidden">
      <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-emerald-500 pl-4">爬升高度剖面圖 (海拔 3,275m)</h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={ELEVATION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorElev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
          <XAxis 
            dataKey="distance" 
            label={{ value: '里程 (KM)', position: 'insideBottomRight', offset: -10, fill: '#94a3b8' }} 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            domain={[0, 3500]} 
            label={{ value: '海拔 (M)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
            formatter={(value: number) => [`${value}m`, '海拔']}
            labelFormatter={(label) => `里程: ${label}km`}
          />
          <Area 
            type="monotone" 
            dataKey="elevation" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorElev)" 
            name="海拔"
          />
          <ReferenceLine y={3275} label={{ value: '武嶺 3275m', fill: '#f43f5e', position: 'top' }} stroke="#f43f5e" strokeDasharray="3 3" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-2 text-[10px] md:text-xs text-slate-400">
        {ELEVATION_DATA.map((p) => (
          <span key={p.name} className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
            {p.name}: {p.elevation}m
          </span>
        ))}
      </div>
    </div>
  );
};

export default ElevationChart;
