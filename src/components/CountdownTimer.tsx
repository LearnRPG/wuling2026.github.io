
import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

interface CountdownTimerProps {
  targetDate: Date;
  title: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, title }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="text-4xl md:text-6xl font-black text-white bg-slate-800/50 w-20 md:w-28 h-20 md:h-28 flex items-center justify-center rounded-xl shadow-inner border border-white/5">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        {title} 倒數中
      </h3>
      <div className="flex flex-wrap justify-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default CountdownTimer;
